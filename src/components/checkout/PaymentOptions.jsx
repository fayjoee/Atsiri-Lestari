import { useState, useEffect } from 'react'

export default function PaymentOptions({ paymentMethod, setPaymentMethod, onPrevStep, onConfirm }) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const seconds = secs % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const vaDetails = {
    bca: { name: 'BCA Virtual Account', number: '8001281234567890' },
    mandiri: { name: 'Mandiri Virtual Account', number: '8801281234567890' },
    bni: { name: 'BNI Virtual Account', number: '8271281234567890' },
    bri: { name: 'BRI Virtual Account', number: '8021281234567890' },
  }

  return (
    <div className="space-y-6">
      {/* Timer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-amber-900">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">⏳</span>
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-wider">Selesaikan Pembayaran Dalam</p>
            <p className="text-sm font-semibold text-amber-800">Menghindari pembatalan pesanan otomatis</p>
          </div>
        </div>
        <div className="font-display font-black text-2xl tracking-wider text-amber-700">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3">
          Pilih Metode Pembayaran
        </h3>

        {/* Accordion Tabs */}
        <div className="space-y-4">
          {/* QRIS Tab */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setPaymentMethod('qris')}
              className={`w-full flex items-center justify-between p-4 font-bold text-sm sm:text-base text-left transition-colors cursor-pointer ${
                paymentMethod === 'qris' ? 'bg-primary text-white' : 'bg-surface text-deep hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center space-x-2.5">
                <span className="text-xl">📱</span>
                <span>QRIS (E-Wallet & Mobile Banking)</span>
              </span>
              <span className="text-xs font-bold bg-white text-primary px-2.5 py-0.5 rounded-full border border-gray-200">
                Instan
              </span>
            </button>
            
            {paymentMethod === 'qris' && (
              <div className="p-6 bg-white flex flex-col items-center text-center space-y-4 animate-scale-in">
                <p className="text-xs text-gray-500 font-medium">
                  Scan kode QRIS di bawah menggunakan aplikasi dompet digital Anda (GoPay, OVO, DANA, ShopeePay, LinkAja) atau Mobile Banking.
                </p>
                {/* SVG QR Code Graphic Representation */}
                <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl relative shadow-md">
                  <svg className="w-48 h-48 text-deep" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corners */}
                    <rect x="10" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="15" y="15" width="10" height="10" />
                    <rect x="70" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="75" y="15" width="10" height="10" />
                    <rect x="10" y="70" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="15" y="75" width="10" height="10" />
                    {/* Random patterns */}
                    <rect x="40" y="20" width="10" height="30" />
                    <rect x="20" y="40" width="30" height="10" />
                    <rect x="60" y="40" width="10" height="20" />
                    <rect x="45" y="60" width="25" height="10" />
                    <rect x="75" y="75" width="15" height="15" />
                    <rect x="45" y="45" width="10" height="10" />
                    {/* Logo in center */}
                    <rect x="40" y="40" width="20" height="20" fill="#FFFFFF" />
                    <circle cx="50" cy="50" r="8" fill="#0B3525" />
                    <circle cx="50" cy="50" r="5" fill="#FFBD59" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="font-display font-extrabold text-deep text-lg">ATSIRI LESTARI</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">NMID: ID1020304050607</p>
                </div>
              </div>
            )}
          </div>

          {/* Virtual Account Tab */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setPaymentMethod('bca')}
              className={`w-full flex items-center justify-between p-4 font-bold text-sm sm:text-base text-left transition-colors cursor-pointer ${
                ['bca', 'mandiri', 'bni', 'bri'].includes(paymentMethod) 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-deep hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center space-x-2.5">
                <span className="text-xl">💳</span>
                <span>Transfer Virtual Account (Verifikasi Otomatis)</span>
              </span>
            </button>

            {['bca', 'mandiri', 'bni', 'bri'].includes(paymentMethod) && (
              <div className="p-6 bg-white space-y-6 animate-scale-in">
                {/* Bank Selectors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(vaDetails).map(([key, details]) => (
                    <button
                      key={key}
                      onClick={() => setPaymentMethod(key)}
                      className={`py-3.5 border-2 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        paymentMethod === key
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-100 hover:bg-gray-50 text-gray-500'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {/* VA info display */}
                <div className="bg-surface rounded-xl p-5 border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nama Bank</p>
                      <p className="font-extrabold text-deep text-sm">{vaDetails[paymentMethod].name}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nomor Virtual Account</p>
                      <p className="font-display font-black text-primary text-lg sm:text-xl tracking-wider select-all">
                        {vaDetails[paymentMethod].number}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(vaDetails[paymentMethod].number)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        copied ? 'bg-emerald-600 text-white' : 'bg-primary text-white hover:bg-primary-light'
                      }`}
                    >
                      {copied ? 'Salin ✓' : 'Salin'}
                    </button>
                  </div>

                  <div className="text-left text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-200">
                    <p className="font-bold">Cara Pembayaran:</p>
                    <ol className="list-decimal pl-4 space-y-0.5">
                      <li>Pilih menu Transfer ke Virtual Account di M-Banking/ATM Anda.</li>
                      <li>Masukkan kode Virtual Account di atas.</li>
                      <li>Konfirmasi nominal tagihan dan selesaikan transaksi.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prev & Confirm Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onPrevStep}
          className="flex-1 py-4 border-2 border-gray-200 hover:border-primary hover:text-primary text-gray-600 rounded-xl text-base font-bold transition-all active:scale-98 text-center cursor-pointer"
        >
          Kembali
        </button>
        <button
          onClick={onConfirm}
          className="flex-2 py-4 bg-accent hover:bg-accent-hover text-deep font-bold rounded-xl text-base shadow-lg hover:shadow-accent/20 transition-all duration-300 transform active:scale-98 text-center cursor-pointer"
        >
          Konfirmasi & Bayar Sekarang
        </button>
      </div>
    </div>
  )
}
