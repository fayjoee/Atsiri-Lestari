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
      console.log('[AuthContext Debug] init() running...')

      // Cek apakah ada code (PKCE flow) di URL query
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      console.log('[AuthContext Debug] Query code parameter:', code)
      if (code) {
        try {
          console.log('[AuthContext Debug] Exchanging PKCE code for session...')
          await supabase.auth.exchangeCodeForSession(code)
          // Hapus ?code=... dari URL
          const newUrl = window.location.pathname + window.location.hash
          window.history.replaceState(null, '', newUrl || '/')
        } catch (err) {
          console.error('[AuthContext Debug] Error exchanging PKCE code:', err.message)
        }
      }

      console.log('[AuthContext Debug] Calling getSession()...')
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
      console.log('[AuthContext Debug] getSession() response:', { currentSession, error: sessionError })

      if (!mounted) return

      if (currentSession?.user) {
        console.log('[AuthContext Debug] User found in session:', currentSession.user.email)
        setSession(currentSession)
        setUser(currentSession.user)

        // Bersihkan hash dari URL jika ada access_token (implicit flow)
        if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('id_token'))) {
          console.log('[AuthContext Debug] Hash access_token found in URL. Cleaning URL.')
          window.history.replaceState(null, '', window.location.pathname)
        }

        const prof = await fetchProfile(currentSession.user.id)
        console.log('[AuthContext Debug] Fetched profile:', prof)
        if (mounted) setProfile(prof)
      } else {
        console.log('[AuthContext Debug] No session found during init()')
      }
      if (mounted) setLoading(false)
    }

    init()

    // Subscribe ke perubahan session (login/logout/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('[AuthContext Debug] onAuthStateChange event triggered:', event, 'session user:', newSession?.user?.email)
        if (!mounted) return

        if (newSession?.user) {
          setSession(newSession)
          setUser(newSession.user)

          // Bersihkan hash dari URL jika ada access_token (implicit flow)
          if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('id_token'))) {
            console.log('[AuthContext Debug] Hash access_token found in onAuthStateChange. Cleaning URL.')
            window.history.replaceState(null, '', window.location.pathname)
          }

          // Fetch profile — bisa ada delay saat trigger baru jalan
          // Coba beberapa kali kalau user baru
          let prof = await fetchProfile(newSession.user.id)
          if (!prof && event === 'SIGNED_IN') {
            console.log('[AuthContext Debug] Profile not found, waiting for trigger...')
            // Tunggu sebentar supaya trigger handle_new_user sempat jalan
            await new Promise(r => setTimeout(r, 800))
            prof = await fetchProfile(newSession.user.id)
          }
          console.log('[AuthContext Debug] Profile set to:', prof)
          setProfile(prof)
          setShowLoginModal(false)
        } else {
          console.log('[AuthContext Debug] No user in session. Resetting auth state.')
          setSession(null)
          setUser(null)
          setProfile(null)
        }

        setLoading(false)
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
        flowType: 'implicit',
      },
    })
    if (error) {
      console.error('Google sign-in error:', error.message)
      throw error
    }
  }, [])

  // ─── Login dengan Email & Password ────────────────────────────────────────
  const signInWithEmail = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }, [])

  // ─── Daftar dengan Email & Password ───────────────────────────────────────
  const signUpWithEmail = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return data
  }, [])

  // ─── Reset Password untuk Email ──────────────────────────────────────────
  const resetPassword = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    })
    if (error) throw error
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
      signInWithEmail,
      signUpWithEmail,
      resetPassword,
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
