import { useState } from 'react'
import { useCart, useCartDispatch, formatPrice } from '../context/CartContext'
import CheckoutForm from '../components/checkout/CheckoutForm'
import PaymentOptions from '../components/checkout/PaymentOptions'
import OrderSummary from '../components/checkout/OrderSummary'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CheckoutPage() {
  const { items, subtotal, total, itemCount } = useCart()
  const dispatch = useCartDispatch()
  const { user, openLogin } = useAuth()

  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Confirmation
  const [shippingData, setShippingData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    courier: 'jne',
    courierCost: 15000,
  })
  const [paymentMethod, setPaymentMethod] = useState('qris')

  // Generate unique order ID
  const orderId = useState(() => 'AL-' + Math.floor(100000 + Math.random() * 900000))[0]

  const handleConfirmPayment = () => {
    // Simulate successful order submission
    setStep(3)
  }

  const handleSuccessDone = () => {
    dispatch({ type: 'CLEAR' })
  }

  // Redirect or block if not logged in
  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-5 px-4 bg-[#FAF6EE]">
        <span className="text-6xl">🔒</span>
        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-2xl text-deep">
            Silakan Masuk Terlebih Dahulu
          </h2>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed mx-auto">
            Untuk melanjutkan proses checkout pembelian limbah atsiri, Anda harus masuk ke akun Atsiri Lestari Anda.
          </p>
        </div>
        <button
          onClick={() => openLogin('/checkout')}
          className="px-8 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md"
        >
          Masuk ke Akun
        </button>
      </div>
    )
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4 bg-[#FAF6EE]">
        <span className="text-6xl">🛒</span>
        <h2 className="font-display font-bold text-deep text-lg">Keranjang Belanja Anda Kosong</h2>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          Silakan tambahkan produk ke keranjang belanja Anda dari katalog sebelum melakukan checkout.
        </p>
        <Link to="/katalog" className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-light transition-all">
          Lihat Katalog
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-24 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        {step !== 3 && (
          <div className="mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between relative">
              {/* Connector line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary z-0 transition-all duration-300"
                style={{ width: step === 1 ? '0%' : '100%' }}
              ></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <span className={`w-10 h-10 rounded-full font-display font-black text-sm flex items-center justify-center border-2 transition-all ${
                  step >= 1 ? 'bg-primary border-primary text-accent' : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  1
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-deep uppercase tracking-wider mt-2.5 bg-white px-2">
                  Pengiriman
                </span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <span className={`w-10 h-10 rounded-full font-display font-black text-sm flex items-center justify-center border-2 transition-all ${
                  step >= 2 ? 'bg-primary border-primary text-accent' : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  2
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-deep uppercase tracking-wider mt-2.5 bg-white px-2">
                  Pembayaran
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        {step !== 3 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Forms column */}
            <div className="lg:col-span-8">
              {step === 1 ? (
                <CheckoutForm
                  shippingData={shippingData}
                  setShippingData={setShippingData}
                  onNextStep={() => setStep(2)}
                />
              ) : (
                <PaymentOptions
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  onPrevStep={() => setStep(1)}
                  onConfirm={handleConfirmPayment}
                />
              )}
            </div>

            {/* Summary column */}
            <div className="lg:col-span-4">
              <OrderSummary courierCost={shippingData.courierCost} />
            </div>
          </div>
        ) : (
          /* Step 3: Success Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto animate-bounce">
              ✓
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-deep">
                Pesanan Berhasil Dibuat!
              </h2>
              <p className="text-sm text-gray-500">
                Terima kasih atas pesanan Anda. Sistem kami telah mendaftarkan transaksi ini.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-surface rounded-2xl p-6 border border-gray-100 text-left space-y-3.5">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">ID Transaksi</span>
                <span className="font-display font-extrabold text-deep">{orderId}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Nama Penerima</span>
                <span className="font-bold text-deep">{shippingData.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Metode Pembayaran</span>
                <span className="font-bold text-primary uppercase">{paymentMethod}</span>
              </div>
              <div className="h-0.5 bg-gray-200"></div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider font-bold">Total Pembayaran</span>
                <span className="font-display font-black text-primary text-base sm:text-lg">
                  {formatPrice(subtotal + shippingData.courierCost)}
                </span>
              </div>
            </div>

            <p className="text-xs text-primary font-semibold leading-relaxed">
              *Detail tata cara pengiriman barang dan update nomor resi akan dikirim melalui SMS/WhatsApp ke nomor {shippingData.phone}.
            </p>

            <div className="pt-4">
              <Link
                to="/"
                onClick={handleSuccessDone}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm transition-all duration-300 transform active:scale-95 text-center cursor-pointer shadow-md"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
