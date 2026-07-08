import { useState } from 'react'

export default function CheckoutForm({ shippingData, setShippingData, onNextStep }) {
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingData((prev) => ({ ...prev, [name]: value }))
    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!shippingData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi'
    if (!shippingData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi'
    else if (!/^\d{9,15}$/.test(shippingData.phone.trim())) {
      newErrors.phone = 'Nomor telepon tidak valid (9-15 digit)'
    }
    if (!shippingData.address.trim()) newErrors.address = 'Alamat pengiriman wajib diisi'
    if (!shippingData.city.trim()) newErrors.city = 'Kota/Kabupaten wajib diisi'
    if (!shippingData.postalCode.trim()) newErrors.postalCode = 'Kode pos wajib diisi'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onNextStep()
    }
  }

  const couriers = [
    { id: 'jne', name: 'JNE (Reguler)', desc: 'Estimasi 2-3 hari kerja', cost: 15000 },
    { id: 'jnt', name: 'J&T Express', desc: 'Estimasi 1-3 hari kerja', cost: 16000 },
    { id: 'sicepat', name: 'SiCepat Halu', desc: 'Estimasi 3-5 hari kerja', cost: 12000 },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3">
          Informasi Pengiriman
        </h3>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Nama Penerima
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={shippingData.name}
            onChange={handleInputChange}
            placeholder="Ketik nama lengkap..."
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${
              errors.name ? 'border-rose-500' : 'border-gray-200'
            }`}
          />
          {errors.name && <p className="text-xs font-semibold text-rose-500">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Nomor Telepon
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={shippingData.phone}
            onChange={handleInputChange}
            placeholder="Contoh: 081234567890"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${
              errors.phone ? 'border-rose-500' : 'border-gray-200'
            }`}
          />
          {errors.phone && <p className="text-xs font-semibold text-rose-500">{errors.phone}</p>}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Alamat Lengkap
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={shippingData.address}
            onChange={handleInputChange}
            placeholder="Ketik nama jalan, nomor rumah, RT/RW, kelurahan/desa..."
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${
              errors.address ? 'border-rose-500' : 'border-gray-200'
            }`}
          />
          {errors.address && <p className="text-xs font-semibold text-rose-500">{errors.address}</p>}
        </div>

        {/* City and Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="city" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Kota / Kabupaten
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingData.city}
              onChange={handleInputChange}
              placeholder="Contoh: Sukabumi"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${
                errors.city ? 'border-rose-500' : 'border-gray-200'
              }`}
            />
            {errors.city && <p className="text-xs font-semibold text-rose-500">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="postalCode" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Kode Pos
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingData.postalCode}
              onChange={handleInputChange}
              placeholder="Contoh: 43111"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${
                errors.postalCode ? 'border-rose-500' : 'border-gray-200'
              }`}
            />
            {errors.postalCode && <p className="text-xs font-semibold text-rose-500">{errors.postalCode}</p>}
          </div>
        </div>
      </div>

      {/* Courier Selection */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3">
          Pilih Jasa Pengiriman
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {couriers.map((courier) => (
            <label
              key={courier.id}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                shippingData.courier === courier.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <input
                  type="radio"
                  name="courier"
                  checked={shippingData.courier === courier.id}
                  onChange={() => setShippingData((prev) => ({ ...prev, courier: courier.id, courierCost: courier.cost }))}
                  className="w-5 h-5 accent-primary"
                />
                <div className="text-left">
                  <p className="font-bold text-deep text-sm">{courier.name}</p>
                  <p className="text-xs text-gray-500">{courier.desc}</p>
                </div>
              </div>
              <span className="font-bold text-primary text-sm">
                Rp {courier.cost.toLocaleString('id-ID')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-base shadow-md hover:shadow-primary/20 transition-all duration-300 transform active:scale-98 text-center cursor-pointer"
      >
        Lanjut ke Metode Pembayaran
      </button>
    </form>
  )
}
