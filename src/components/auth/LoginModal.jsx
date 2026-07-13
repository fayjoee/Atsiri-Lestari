import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal() {
  const { showLoginModal, closeLogin, signInWithGoogle } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!showLoginModal) return null

  const handleGoogleLogin = async () => {
    setError('')
    setIsLoading(true)
    try {
      await signInWithGoogle()
      // Setelah signInWithOAuth, browser akan redirect ke Google.
      // Modal ini akan menutup sendiri setelah user kembali (via onAuthStateChange).
    } catch (err) {
      setError('Gagal masuk dengan Google. Pastikan koneksi internet stabil dan coba lagi.')
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
      <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center space-y-7 animate-scale-in">
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

          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-xl text-deep">
              Masuk ke Akun Anda
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              Masuk untuk membeli produk atsiri, atau daftar sebagai penjual dari dalam aplikasi.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-gray-300">
          <span className="flex-1 h-px bg-gray-100" />
          <span className="font-semibold text-gray-400">Lanjutkan dengan</span>
          <span className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-rose-600 text-xs font-semibold text-left">
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 hover:border-primary hover:shadow-lg rounded-2xl text-sm font-bold text-deep transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <svg className="animate-spin w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            /* Google Icon SVG */
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          <span>{isLoading ? 'Mengarahkan ke Google...' : 'Masuk dengan Google'}</span>
        </button>

        {/* Info footer */}
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Dengan masuk, Anda otomatis terdaftar sebagai <span className="font-bold text-gray-600">Pembeli</span>.
          Fitur penjualan bisa diaktifkan setelah login melalui tombol{' '}
          <span className="font-bold text-primary">"Jadi Penjual"</span> di navbar.
        </p>
      </div>
    </div>
  )
}
