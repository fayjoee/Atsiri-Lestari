import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const STORE_CATEGORIES = [
  'Sereh Wangi',
  'Nilam',
  'Cengkeh',
  'Kayu Putih',
  'Pala',
  'Gaharu',
  'Cendana',
  'Pinus',
  'Campuran / Multi Komoditas',
  'Produk Turunan (Briket, Kompos, dll)',
  'Lainnya',
]

export default function BecomeSellerPage() {
  const navigate = useNavigate()
  const { user, profile, loading, openLogin, refreshProfile } = useAuth()

  const [storeName, setStoreName]     = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress]         = useState('')
  const [category, setCategory]       = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError]             = useState('')

  // ─── Proteksi route ───────────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return
    if (!user) {
      // Belum login → buka modal login
      openLogin('/menjadi-penjual')
      navigate('/')
      return
    }
    if (profile?.is_seller) {
      // Sudah seller → langsung ke dashboard
      navigate('/dashboard/seller', { replace: true })
    }
  }, [user, profile, loading, navigate, openLogin])

  // ─── Submit form pendaftaran toko ─────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!storeName.trim() || !category) {
      setError('Nama toko dan kategori wajib diisi.')
      return
    }

    setIsSubmitting(true)
    try {
      // 1. Insert ke seller_profiles
      const { error: spError } = await supabase
        .from('seller_profiles')
        .insert({
          user_id:     user.id,
          store_name:  storeName.trim(),
          description: description.trim() || null,
          address:     address.trim() || null,
          category,
        })

      if (spError) throw spError

      // 2. Update profiles.is_seller = true
      const { error: profError } = await supabase
        .from('profiles')
        .update({ is_seller: true })
        .eq('id', user.id)

      if (profError) throw profError

      // 3. Refresh profile di context supaya Navbar langsung update
      await refreshProfile()

      // 4. Redirect ke dashboard seller
      navigate('/dashboard/seller', { replace: true })
    } catch (err) {
      console.error('BecomeSellerPage submit error:', err)
      setError(
        err.message?.includes('duplicate')
          ? 'Toko Anda sudah terdaftar. Mengarahkan ke dashboard...'
          : `Terjadi kesalahan: ${err.message}. Coba lagi atau hubungi support.`
      )
      if (err.message?.includes('duplicate')) {
        await refreshProfile()
        setTimeout(() => navigate('/dashboard/seller', { replace: true }), 1500)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state saat profile belum di-fetch
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-sm font-medium text-gray-500">Memverifikasi sesi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] pt-28 pb-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 font-semibold mb-8 text-left flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span>/</span>
          <span className="text-gray-900">Daftar sebagai Penjual</span>
        </nav>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-8">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mx-auto">
              🌿
            </div>
            <div>
              <h1 className="font-display font-extrabold text-2xl text-deep">
                Daftarkan Toko Anda
              </h1>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                Isi data toko berikut untuk mulai menjual limbah atsiri di platform Atsiri Lestari.
                Pendaftaran gratis dan langsung aktif.
              </p>
            </div>

            {/* Info: siapa yang mendaftar */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-left flex items-center gap-3">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm">
                  {(profile?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-primary">{profile?.full_name || user.email}</p>
                <p className="text-[10px] text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 text-rose-600 text-xs font-semibold leading-relaxed">
                {error}
              </div>
            )}

            {/* Nama Toko */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                Nama Toko <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Contoh: Kebun Atsiri Pak Budi"
                maxLength={100}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>

            {/* Kategori Komoditas */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                Kategori Komoditas Utama <span className="text-rose-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors bg-white"
              >
                <option value="">-- Pilih kategori --</option>
                {STORE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Deskripsi Toko */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                Deskripsi Toko <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Ceritakan singkat tentang usaha Anda, jenis produk yang dijual, pengalaman menyuling, dll..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors resize-none"
              />
            </div>

            {/* Alamat */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                Alamat / Lokasi Kebun <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Desa Cibodas, Kec. Lembang, Kab. Bandung Barat"
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="submitBecomeSeller"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <span>Mendaftarkan Toko...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Daftarkan Toko Saya</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            Dengan mendaftar, Anda menyetujui{' '}
            <span className="underline text-primary cursor-pointer">Ketentuan Penjual</span>{' '}
            Atsiri Lestari. Data toko dapat diubah kapan saja dari dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
