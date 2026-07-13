import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal() {
  const { 
    showLoginModal, 
    closeLogin, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    resetPassword 
  } = useAuth()

  const [view, setView] = useState('login') // 'login' | 'register' | 'forgot_password'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Reset form states when modal is opened/closed
  useEffect(() => {
    if (!showLoginModal) {
      setView('login')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setError('')
      setSuccess('')
    }
  }, [showLoginModal])

  if (!showLoginModal) return null

  const translateError = (errorMsg) => {
    if (!errorMsg) return ''
    const msg = errorMsg.toLowerCase()
    if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
      return 'Email atau kata sandi salah. Silakan periksa kembali.'
    }
    if (msg.includes('user already exists') || msg.includes('already registered')) {
      return 'Email sudah terdaftar. Silakan masuk menggunakan email ini.'
    }
    if (msg.includes('signup is disabled')) {
      return 'Pendaftaran akun baru saat ini sedang dinonaktifkan.'
    }
    if (msg.includes('email not confirmed') || msg.includes('email_not_confirmed')) {
      return 'Email belum dikonfirmasi. Silakan periksa kotak masuk email Anda untuk melakukan verifikasi.'
    }
    if (msg.includes('rate limit')) {
      return 'Terlalu banyak percobaan masuk. Silakan coba lagi beberapa saat lagi.'
    }
    if (msg.includes('password should be at least')) {
      return 'Kata sandi harus minimal 6 karakter.'
    }
    return errorMsg // fallback
  }

  const handleGoogleLogin = async () => {
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError('Gagal masuk dengan Google. Pastikan koneksi internet stabil dan coba lagi.')
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    setError('')
    setSuccess('')

    if (!email) {
      setError('Email wajib diisi.')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid.')
      return false
    }

    if (view !== 'forgot_password') {
      if (!password) {
        setError('Kata sandi wajib diisi.')
        return false
      }
      if (password.length < 6) {
        setError('Kata sandi harus minimal 6 karakter.')
        return false
      }
    }

    if (view === 'register') {
      if (!confirmPassword) {
        setError('Konfirmasi kata sandi wajib diisi.')
        return false
      }
      if (password !== confirmPassword) {
        setError('Konfirmasi kata sandi tidak cocok.')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      if (view === 'login') {
        await signInWithEmail(email, password)
        // Modal will close automatically on successful auth change detection
      } else if (view === 'register') {
        const res = await signUpWithEmail(email, password)
        if (res?.user && !res?.session) {
          setSuccess('Pendaftaran berhasil! Silakan periksa inbox email Anda untuk melakukan verifikasi akun.')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        } else {
          setSuccess('Pendaftaran berhasil! Anda telah masuk secara otomatis.')
        }
      } else if (view === 'forgot_password') {
        await resetPassword(email)
        setSuccess('Tautan reset kata sandi telah dikirim ke email Anda. Silakan periksa inbox/spam.')
        setEmail('')
      }
    } catch (err) {
      console.error('[LoginModal] Auth error:', err)
      setError(translateError(err.message || 'Terjadi kesalahan sistem.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeLogin}
        className="absolute inset-0 bg-deep/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      {/* Modal Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center space-y-6 animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Close Button */}
        <button
          onClick={closeLogin}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
          aria-label="Tutup"
        >
          ✕
        </button>

        {/* Logo & Heading */}
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" fill="#0B3525"/>
              <path
                d="M20 32 C20 22, 26 16, 32 16 C40 16, 48 24, 48 32 C48 40, 40 48, 32 48 C26 48, 20 42, 20 32 M48 32 C48 22, 42 16, 32 16 C24 16, 16 24, 16 32 C16 40, 24 48, 32 48 C42 48, 48 42, 48 32"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl tracking-wider text-primary">ATSIRI</span>
              <span className="font-sans text-xs font-semibold text-accent tracking-widest -mt-1">LESTARI</span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-xl text-deep">
              {view === 'login' && 'Masuk ke Akun'}
              {view === 'register' && 'Daftar Akun Baru'}
              {view === 'forgot_password' && 'Reset Kata Sandi'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              {view === 'login' && 'Masuk untuk membeli produk atsiri terbaik.'}
              {view === 'register' && 'Daftar sebagai pembeli atau kelola penjualan Anda.'}
              {view === 'forgot_password' && 'Masukkan email Anda untuk menerima tautan pemulihan.'}
            </p>
          </div>
        </div>

        {/* Google Login (Only for login and register views) */}
        {(view === 'login' || view === 'register') && (
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 hover:border-primary hover:shadow-lg rounded-2xl text-sm font-bold text-deep transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>{isLoading ? 'Menghubungkan...' : 'Masuk dengan Google'}</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <span className="flex-1 h-px bg-gray-100" />
              <span className="font-semibold text-gray-400">atau gunakan email</span>
              <span className="flex-1 h-px bg-gray-100" />
            </div>
          </div>
        )}

        {/* Alert Messages */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3.5 text-rose-600 text-xs font-semibold text-left leading-relaxed animate-fade-in">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3.5 text-primary text-xs font-semibold text-left leading-relaxed animate-fade-in">
            {success}
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left space-y-1">
            <label className="text-[11px] font-bold text-deep/75 block px-1">Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white rounded-2xl text-xs text-deep font-semibold transition-all duration-200 outline-none"
              disabled={isLoading}
            />
          </div>

          {view !== 'forgot_password' && (
            <div className="text-left space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-deep/75 block">Kata Sandi</label>
                {view === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setView('forgot_password')
                      setError('')
                      setSuccess('')
                    }}
                    className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    Lupa Sandi?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white rounded-2xl text-xs text-deep font-semibold transition-all duration-200 outline-none"
                disabled={isLoading}
              />
            </div>
          )}

          {view === 'register' && (
            <div className="text-left space-y-1">
              <label className="text-[11px] font-bold text-deep/75 block px-1">Konfirmasi Kata Sandi</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white rounded-2xl text-xs text-deep font-semibold transition-all duration-200 outline-none"
                disabled={isLoading}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-primary hover:bg-[#124231] text-white font-bold rounded-2xl text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : null}
            <span>
              {isLoading ? 'Memproses...' : view === 'login' ? 'Masuk' : view === 'register' ? 'Daftar' : 'Kirim Link Reset'}
            </span>
          </button>
        </form>

        {/* View Switcher Footer */}
        <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 font-medium">
          {view === 'login' && (
            <p>
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setView('register')
                  setError('')
                  setSuccess('')
                }}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Daftar di sini
              </button>
            </p>
          )}
          {view === 'register' && (
            <p>
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setView('login')
                  setError('')
                  setSuccess('')
                }}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Masuk di sini
              </button>
            </p>
          )}
          {view === 'forgot_password' && (
            <p>
              <button
                type="button"
                onClick={() => {
                  setView('login')
                  setError('')
                  setSuccess('')
                }}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Kembali ke halaman Masuk
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
