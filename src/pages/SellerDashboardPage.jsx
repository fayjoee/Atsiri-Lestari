import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../context/CartContext'

export default function SellerDashboardPage() {
  const { user, openLogin } = useAuth()
  const [wasteType, setWasteType] = useState('Sereh Wangi')
  const [wasteCategory, setWasteCategory] = useState('limbah-padat')
  const [qty, setQty] = useState('')
  const [moisture, setMoisture] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Mock active listings for seller
  const [listings, setListings] = useState([
    { id: 1, type: 'Nilam', cat: 'Limbah Padat', qty: 1200, unit: 'kg', price: 3200, status: 'Aktif', date: '2026-07-01' },
    { id: 2, type: 'Cengkeh', cat: 'Limbah Cair', qty: 500, unit: 'liter', price: 6500, status: 'Terjual', date: '2026-06-25' },
    { id: 3, type: 'Sereh Wangi', cat: 'Limbah Padat', qty: 2500, unit: 'kg', price: 2800, status: 'Verifikasi', date: '2026-07-06' },
  ])

  // Redirect to login if not logged in
  if (!user || user.type !== 'seller') {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-5 px-4 bg-[#FAF6EE]">
        <span className="text-6xl">👨‍🌾</span>
        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-2xl text-deep">
            Akses Khusus Petani & Penyuling Atsiri
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed mx-auto">
            Halaman ini digunakan untuk mengunggah stok limbah padat atau cair hasil sulingan Anda untuk dijual secara tetap (Fixed Price) kepada Mitra Industri B2B.
          </p>
        </div>
        <button
          onClick={() => openLogin('/jual')}
          className="px-8 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md"
        >
          Masuk sebagai Penjual/Petani
        </button>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!qty || !price || !moisture) {
      alert('Mohon lengkapi data stok limbah Anda.')
      return
    }

    const newListing = {
      id: Date.now(),
      type: wasteType,
      cat: wasteCategory === 'limbah-padat' ? 'Limbah Padat' : 'Limbah Cair',
      qty: Number(qty),
      unit: wasteCategory === 'limbah-padat' ? 'kg' : 'liter',
      price: Number(price),
      status: 'Verifikasi',
      date: new Date().toISOString().split('T')[0]
    }

    setListings((prev) => [newListing, ...prev])
    setQty('')
    setMoisture('')
    setPrice('')
    setDesc('')
    setSuccessMsg('Stok limbah berhasil diajukan! Admin kami akan memverifikasi spesifikasi kadar air dalam 1x24 jam.')
    setTimeout(() => setSuccessMsg(''), 5000)
  }

  const earnings = listings
    .filter(l => l.status === 'Terjual')
    .reduce((sum, l) => sum + (l.qty * l.price), 0)

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-24 pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200/50 pb-6">
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-deep">
              Portal Penjualan Petani
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Selamat datang kembali, <span className="font-bold text-primary">{user.name}</span> ({user.role})
            </p>
          </div>
          
          {/* Dashboard Stats */}
          <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex items-center space-x-4">
            <span className="text-2xl">💰</span>
            <div className="text-left">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Pendapatan Terjual</p>
              <p className="font-display font-black text-emerald-600 text-lg">{formatPrice(earnings)}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (Sell Waste) */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3 flex items-center space-x-2">
              <span>🌾</span>
              <span>Jual Stok Limbah Baru</span>
            </h3>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold p-3.5 rounded-xl">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plant type */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Jenis Tanaman Atsiri
                </label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm bg-white"
                >
                  {['Sereh Wangi', 'Nilam', 'Cengkeh', 'Kayu Putih', 'Pala', 'Gaharu', 'Cendana', 'Pinus'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Bentuk Limbah
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWasteCategory('limbah-padat')}
                    className={`py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      wasteCategory === 'limbah-padat' ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    Limbah Padat (Ampas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWasteCategory('limbah-cair')}
                    className={`py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      wasteCategory === 'limbah-cair' ? 'bg-primary border-primary text-white' : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    Limbah Cair (Kondensat)
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Jumlah Pasokan ({wasteCategory === 'limbah-padat' ? 'kg' : 'liter'})
                </label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Contoh: 1000"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Moisture / Standar Pengeringan */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Estimasi Kadar Air / Moisture (%)
                </label>
                <input
                  type="text"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  placeholder="Contoh: 15% atau Kering Sempurna"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Requested Fixed Price */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Harga Fixed yang Diajukan (Rp / satuan)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Contoh: 3000"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                  Deskripsi / Catatan Tambahan
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows="2"
                  placeholder="Kondisi pengeringan, tanggal penyulingan..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all cursor-pointer text-center"
              >
                Ajukan Stok Limbah
              </button>
            </form>
          </div>

          {/* List of Active Listings */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3 flex items-center space-x-2">
              <span>📋</span>
              <span>Daftar Pengajuan Stok Anda</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-xs sm:text-sm text-left">
                <thead>
                  <tr className="text-gray-500 font-bold">
                    <th className="pb-3">Tanggal</th>
                    <th className="pb-3">Jenis Limbah</th>
                    <th className="pb-3">Jumlah</th>
                    <th className="pb-3">Harga Tetap</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {listings.map((l) => (
                    <tr key={l.id} className="text-gray-700">
                      <td className="py-3.5 text-gray-500 font-medium">{l.date}</td>
                      <td className="py-3.5">
                        <span className="font-bold text-deep block">{l.type}</span>
                        <span className="text-[10px] text-gray-400">{l.cat}</span>
                      </td>
                      <td className="py-3.5 font-semibold text-deep">{l.qty.toLocaleString('id-ID')} {l.unit}</td>
                      <td className="py-3.5 font-bold text-primary">{formatPrice(l.price)}</td>
                      <td className="py-3.5 text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          l.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' :
                          l.status === 'Terjual' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
