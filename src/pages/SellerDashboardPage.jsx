import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { formatPrice } from '../context/CartContext'
import { parseProduct } from '../lib/validations'

const PRODUCT_CATEGORIES = [
  'limbah-padat',
  'limbah-cair',
  'produk-turunan',
]

const UNIT_OPTIONS = [
  { value: 'kg',    label: 'Kilogram (kg)' },
  { value: 'liter', label: 'Liter (liter)' },
  { value: 'pcs',   label: 'Satuan (pcs)' },
]

const CATEGORY_LABELS = {
  'limbah-padat':    'Limbah Padat',
  'limbah-cair':     'Limbah Cair',
  'produk-turunan':  'Produk Turunan',
}

const STATUS_BADGES = {
  aktif:     'bg-emerald-100 text-emerald-800',
  terjual:   'bg-blue-100 text-blue-800',
  habis:     'bg-rose-100 text-rose-800',
}

export default function SellerDashboardPage() {
  const navigate  = useNavigate()
  const { user, profile, loading, openLogin } = useAuth()

  // ─── State: form tambah produk ────────────────────────────────────────────
  const [name, setName]         = useState('')
  const [description, setDesc]  = useState('')
  const [price, setPrice]       = useState('')
  const [stock, setStock]       = useState('')
  const [category, setCat]      = useState('limbah-padat')
  const [unit, setUnit]         = useState('kg')
  const [moq, setMoq]           = useState('1')
  const [imageUrl, setImageUrl] = useState('')
  const [formError, setFormError]     = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ─── State: daftar produk & info toko ────────────────────────────────────
  const [products, setProducts]       = useState([])
  const [sellerProfile, setSellerProfile] = useState(null)
  const [productsLoading, setProductsLoading] = useState(true)

  // ─── Proteksi route ───────────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return
    if (!user) {
      openLogin('/dashboard/seller')
      navigate('/', { replace: true })
      return
    }
    if (profile && !profile.is_seller) {
      navigate('/menjadi-penjual', { replace: true })
    }
  }, [user, profile, loading, navigate, openLogin])

  // ─── Fetch produk & info toko ─────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!user) return
    setProductsLoading(true)

    const [{ data: prods, error: prodErr }, { data: sp, error: spErr }] = await Promise.all([
      supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('seller_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single(),
    ])

    if (prodErr) console.error('Fetch products error:', prodErr.message)
    else setProducts(prods || [])

    if (!spErr) setSellerProfile(sp)

    setProductsLoading(false)
  }, [user])

  useEffect(() => {
    if (user && profile?.is_seller) {
      fetchData()
    }
  }, [user, profile, fetchData])

  // ─── Submit tambah produk ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')

    if (!name.trim() || !price || !stock) {
      setFormError('Nama produk, harga, dan stok wajib diisi.')
      return
    }

    setIsSubmitting(true)
    try {
      // Validasi dengan Zod sebelum kirim ke Supabase
      const validated = parseProduct({
        seller_id:   user.id,
        name:        name.trim(),
        description: description.trim() || null,
        price:       Number(price),
        stock:       Number(stock),
        category,
        unit,
        moq:         Number(moq) || 1,
        image_url:   imageUrl.trim() || null,
      })

      const { error } = await supabase
        .from('products')
        .insert(validated)

      if (error) throw error

      setFormSuccess('Produk berhasil ditambahkan!')
      setTimeout(() => setFormSuccess(''), 4000)

      // Reset form
      setName(''); setDesc(''); setPrice(''); setStock(''); setMoq('1'); setImageUrl('')

      // Refresh daftar produk
      await fetchData()
    } catch (err) {
      if (err.name === 'ZodError') {
        const msg = err.issues?.map((e) => e.message).join(' · ')
        setFormError(`Data tidak valid: ${msg}`)
      } else {
        setFormError(`Gagal menambahkan produk: ${err.message}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Hapus produk ─────────────────────────────────────────────────────────
  const handleDelete = async (productId) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
      .eq('seller_id', user.id)

    if (error) {
      alert(`Gagal menghapus: ${error.message}`)
    } else {
      await fetchData()
    }
  }

  // ─── Statistik ────────────────────────────────────────────────────────────
  const totalStock  = products.reduce((s, p) => s + (p.stock || 0), 0)
  const totalValue  = products.reduce((s, p) => s + (p.price * (p.stock || 0)), 0)

  // ─── Loading / Auth guard ─────────────────────────────────────────────────
  if (loading || !user || (profile && !profile.is_seller)) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-sm font-medium text-gray-500">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-24 pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200/50 pb-6">
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-deep">
              Dapur Penjualan Limbah Atsiri
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Halo kembali,{' '}
              <span className="font-bold text-primary">
                {sellerProfile?.store_name || profile?.full_name}
              </span>
              {sellerProfile?.category && (
                <span className="ml-1 text-gray-400">· {sellerProfile.category}</span>
              )}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3 flex-wrap">
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <span className="text-2xl">🌿</span>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jenis Limbah</p>
                <p className="font-display font-black text-primary text-lg">{products.length}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <span className="text-2xl">⚖️</span>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Tersedia</p>
                <p className="font-display font-black text-deep text-lg">{totalStock.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center space-x-3">
              <span className="text-2xl">💵</span>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimasi Nilai</p>
                <p className="font-display font-black text-emerald-600 text-lg">{formatPrice(totalValue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Toko (bila ada) */}
        {sellerProfile && (
          <div className="mb-8 bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-bold text-primary text-sm flex items-center gap-1.5">
                <span>🏪</span>
                {sellerProfile.store_name}
              </p>
              {sellerProfile.description && (
                <p className="text-xs text-gray-500 line-clamp-2 max-w-xl">{sellerProfile.description}</p>
              )}
              {sellerProfile.address && (
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                  <span>📍</span>{sellerProfile.address}
                </p>
              )}
            </div>
            <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
              ✓ Lapak Aktif
            </span>
          </div>
        )}

        {/* Main Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── Form Tambah Produk ── */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3 flex items-center space-x-2">
              <span>🌿</span>
              <span>Daftarkan Limbah Baru</span>
            </h3>

            {formSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
                <span>✅</span>
                {formSuccess}
              </div>
            )}

            {formError && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold p-3.5 rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Nama Produk */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Nama Limbah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ampas Sereh Wangi Kering"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Kategori */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Kategori <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCat(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm bg-white"
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>
                  ))}
                </select>
              </div>

              {/* Satuan */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Satuan <span className="text-rose-500">*</span>
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm bg-white"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>

              {/* Harga & Stok */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    Harga per {unit.toUpperCase()} (Rp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="3500"
                    min="0"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                    Jumlah Tersedia ({unit}) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="1000"
                    min="0"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>

              {/* MOQ */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Minimal Pembelian ({unit})
                </label>
                <input
                  type="number"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="1"
                  min="1"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* URL Gambar Produk */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  URL Gambar <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://contoh.com/gambar-produk.jpg"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
                {imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-gray-100 h-24 bg-gray-50 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Keterangan Tambahan <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={2}
                  placeholder="Contoh: kondisi kering, asal Garut, kadar air &lt;12%, siap kirim..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all cursor-pointer text-center disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  '+ Daftarkan Limbah'
                )}
              </button>
            </form>
          </div>

          {/* ── Daftar Produk ── */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3 flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span>🗂️</span>
                <span>Limbah yang Saya Jual</span>
              </span>
              {products.length > 0 && (
                <span className="text-xs font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                  {products.length} jenis
                </span>
              )}
            </h3>

            {productsLoading ? (
              <div className="flex items-center justify-center py-12 gap-3">
                <svg className="animate-spin w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span className="text-sm text-gray-500">Memuat data limbah...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                <span className="text-5xl">🌱</span>
                <div>
                  <p className="font-bold text-deep text-base">Belum ada limbah yang didaftarkan</p>
                  <p className="text-xs text-gray-500 mt-1">Mulai daftarkan limbah atsiri Anda menggunakan form di sebelah kiri.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-xs sm:text-sm text-left">
                  <thead>
                    <tr className="text-gray-500 font-bold">
                      <th className="pb-3 pr-4">Nama Limbah</th>
                      <th className="pb-3 pr-4">Harga/kg</th>
                      <th className="pb-3 pr-4">Tersedia (kg)</th>
                      <th className="pb-3 pr-4">Jenis</th>
                      <th className="pb-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="text-gray-700 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-2">
                            {prod.image_url && (
                              <img
                                src={prod.image_url}
                                alt={prod.name}
                                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-gray-100"
                                onError={(e) => { e.target.style.display = 'none' }}
                              />
                            )}
                            <div>
                              <span className="font-bold text-deep block line-clamp-1">{prod.name}</span>
                              {prod.moq > 1 && (
                                <span className="text-[10px] text-gray-400">Min. beli: {prod.moq} {prod.unit || 'kg'}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 font-bold text-primary whitespace-nowrap">
                          {formatPrice(prod.price)}
                          <span className="text-[10px] text-gray-400 font-normal">/{prod.unit || 'kg'}</span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className={`font-semibold ${prod.stock === 0 ? 'text-rose-500' : 'text-deep'}`}>
                            {prod.stock.toLocaleString('id-ID')}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="text-[10px] bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded-lg font-semibold whitespace-nowrap">
                            {CATEGORY_LABELS[prod.category] || prod.category}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="text-[10px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            Tarik
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
