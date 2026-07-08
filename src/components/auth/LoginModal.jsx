import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal() {
  const { showLoginModal, closeLogin, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleType, setRoleType] = useState('buyer') // buyer or seller
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  if (!showLoginModal) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Email/No. Telepon dan password wajib diisi.')
      return
    }

    if (password.length < 4) {
      setError('Password minimal 4 karakter.')
      return
    }

    // Call mock login
    login(email, roleType)
  }

  const handleQuickLogin = (quickEmail, type) => {
    login(quickEmail, type)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeLogin}
        className="absolute inset-0 bg-deep/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      {/* Modal Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 text-left space-y-6 animate-scale-in">
        {/* Close Button */}
        <button 
          onClick={closeLogin}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center space-x-2">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" fill="#FFBD59"/>
              <path d="M32 12 C28 20, 20 28, 20 36 C20 44, 25 50, 32 50 C39 50, 44 44, 44 36 C44 28, 36 20, 32 12Z" fill="#0B3525"/>
            </svg>
            <span className="font-display font-black text-xl text-primary tracking-wider">ATSIRI LESTARI</span>
          </div>
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-deep pt-1">
            {isRegister ? 'Daftar Akun Baru' : 'Masuk Ke Akun Anda'}
          </h3>
          <p className="text-xs text-gray-500">
            {isRegister ? 'Gabung sebagai mitra atau konsumen atsiri sirkular' : 'Gunakan akun Anda untuk membeli atau menjual limbah'}
          </p>
        </div>

        {/* Role Type Selector Tab (Shopee Style) */}
        <div className="grid grid-cols-2 gap-2 border-b border-gray-100 pb-1">
          <button
            type="button"
            onClick={() => setRoleType('buyer')}
            className={`py-2 text-xs sm:text-sm font-bold border-b-2 text-center transition-all cursor-pointer ${
              roleType === 'buyer'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Membeli (Konsumen/Industri)
          </button>
          <button
            type="button"
            onClick={() => setRoleType('seller')}
            className={`py-2 text-xs sm:text-sm font-bold border-b-2 text-center transition-all cursor-pointer ${
              roleType === 'seller'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Menjual (Petani/Penyuling)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-rose-600 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Email or Phone */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
              Email atau No. Telepon
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contoh: budi@gmail.com atau 081234..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ketik password..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all duration-300 transform active:scale-98 text-center cursor-pointer shadow-md"
          >
            {isRegister ? 'Daftar Sekarang' : 'Masuk Akun'}
          </button>
        </form>

        {/* Quick Demo Accounts Helper */}
        <div className="bg-primary/5 border border-primary-light/10 rounded-2xl p-4 text-xs space-y-2">
          <p className="font-bold text-primary text-center">Akun Demo (Klik untuk Masuk Cepat):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
            <button
              onClick={() => handleQuickLogin('budi@atsirilestari.id', 'seller')}
              className="p-2 bg-white border border-gray-200 hover:border-primary rounded-xl text-[10px] font-semibold text-deep cursor-pointer"
            >
              🌾 Petani: Budi (Penjual)
            </button>
            <button
              onClick={() => handleQuickLogin('hendra@aroma.id', 'buyer')}
              className="p-2 bg-white border border-gray-200 hover:border-primary rounded-xl text-[10px] font-semibold text-deep cursor-pointer"
            >
              🏢 Industri: Hendra (Pembeli)
            </button>
          </div>
        </div>

        {/* Toggle Form type links */}
        <div className="text-center text-xs text-gray-500">
          {isRegister ? (
            <p>
              Sudah punya akun?{' '}
              <button 
                onClick={() => setIsRegister(false)}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Masuk di sini
              </button>
            </p>
          ) : (
            <p>
              Belum punya akun?{' '}
              <button 
                onClick={() => setIsRegister(true)}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Daftar Gratis
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
