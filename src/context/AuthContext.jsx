import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession]             = useState(null)
  const [user, setUser]                   = useState(null)     // auth.users record
  const [profile, setProfile]             = useState(null)     // public.profiles record (incl. is_seller)
  const [loading, setLoading]             = useState(true)     // true saat pertama kali init
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [redirectPath, setRedirectPath]   = useState(null)

  // ─── Fetch profil dari tabel public.profiles ─────────────────────────────
  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      // Profil mungkin belum terbuat kalau trigger belum jalan
      console.warn('fetchProfile error:', error.message)
      return null
    }
    return data
  }, [])

  // ─── Init session saat mount ──────────────────────────────────────────────
  useEffect(() => {
    let mounted = true

    const init = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession()

      if (!mounted) return

      if (currentSession?.user) {
        setSession(currentSession)
        setUser(currentSession.user)
        const prof = await fetchProfile(currentSession.user.id)
        if (mounted) setProfile(prof)
      }
      if (mounted) setLoading(false)
    }

    init()

    // Subscribe ke perubahan session (login/logout/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return

        if (newSession?.user) {
          setSession(newSession)
          setUser(newSession.user)
          // Fetch profile — bisa ada delay saat trigger baru jalan
          // Coba beberapa kali kalau user baru
          let prof = await fetchProfile(newSession.user.id)
          if (!prof && event === 'SIGNED_IN') {
            // Tunggu sebentar supaya trigger handle_new_user sempat jalan
            await new Promise(r => setTimeout(r, 800))
            prof = await fetchProfile(newSession.user.id)
          }
          setProfile(prof)
          setShowLoginModal(false)
        } else {
          setSession(null)
          setUser(null)
          setProfile(null)
        }

        if (loading) setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Refresh profile (dipanggil setelah user jadi seller) ─────────────────
  const refreshProfile = useCallback(async () => {
    if (!user) return
    const prof = await fetchProfile(user.id)
    setProfile(prof)
  }, [user, fetchProfile])

  // ─── Login dengan Google OAuth ────────────────────────────────────────────
  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) {
      console.error('Google sign-in error:', error.message)
      throw error
    }
  }, [])

  // ─── Logout ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    // State sudah di-reset oleh onAuthStateChange listener
  }, [])

  // ─── Buka / tutup login modal ─────────────────────────────────────────────
  const openLogin = useCallback((path = null) => {
    setRedirectPath(path)
    setShowLoginModal(true)
  }, [])

  const closeLogin = useCallback(() => {
    setShowLoginModal(false)
  }, [])

  // ─── Backward-compat helpers ──────────────────────────────────────────────
  // Beberapa komponen lama masih memanggil logout() / login()
  const logout = signOut

  return (
    <AuthContext.Provider value={{
      // State
      session,
      user,
      profile,          // { id, email, full_name, avatar_url, is_seller, created_at }
      loading,
      showLoginModal,
      redirectPath,

      // Actions
      signInWithGoogle,
      signOut,
      logout,           // alias signOut (backward compat)
      openLogin,
      closeLogin,
      setRedirectPath,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return context
}
