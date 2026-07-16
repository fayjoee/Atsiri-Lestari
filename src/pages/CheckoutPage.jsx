import { useState, useCallback } from 'react'
import { useCart, useCartDispatch, formatPrice } from '../context/CartContext'
import CheckoutForm from '../components/checkout/CheckoutForm'
import PaymentOptions from '../components/checkout/PaymentOptions'
import OrderSummary from '../components/checkout/OrderSummary'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { buildTransactionPayload, parseFullTransaction } from '../lib/validations'

// Generate kode order unik format AL-XXXXXX
function generateOrderCode() {
  return 'AL-' + String(Math.floor(100000 + Math.random() * 900000))
}

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
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

  // State untuk proses submit & hasil
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [confirmedOrder, setConfirmedOrder] = useState(null) // data dari DB setelah insert

  // ─── Submit pesanan ke Supabase ──────────────────────────────────────────
  const handleConfirmPayment = useCallback(async () => {
    if (!user) {
      openLogin('/checkout')
      return
    }
    if (items.length === 0) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const orderId = generateOrderCode()

      // 1. Bangun payload (camelCase form → snake_case DB)
      const { transaction, items: txItems } = buildTransactionPayload(
        shippingData,
        paymentMethod,
        subtotal,
        user.id,
        orderId,
        items
      )

      // 2. Validasi dengan Zod sebelum kirim ke Supabase
      parseFullTransaction({ ...transaction, items: txItems })

      // 3. Insert header transaksi
      const { data: txData, error: txError } = await supabase
        .from('transactions')
        .insert(transaction)
        .select()
        .single()

      if (txError) throw txError

      // 4. Insert semua item produk (ganti product_id jika dari data statis → string ke uuid)
      //    Catatan: produk dari data/products.js masih pakai integer ID.
      //    Jika produk sudah dari DB Supabase, product_id akan berupa UUID.
      //    Untuk sementara, kita simpan tanpa product_id FK jika ID bukan UUID.
      const itemsToInsert = txItems.map((item) => ({
        transaction_id: txData.id,
        product_id:     isValidUUID(String(item.product_id)) ? item.product_id : null,
        product_name:   item.product_name,
        product_price:  item.product_price,
        quantity:       item.quantity,
        subtotal:       item.subtotal,
      }))

      const { error: itemsError } = await supabase
        .from('transaction_items')
        .insert(itemsToInsert)

      if (itemsError) throw itemsError

      // 5. Berhasil — simpan data konfirmasi dan pindah ke step 3
      setConfirmedOrder(txData)
      setStep(3)
    } catch (err) {
      console.error('Checkout submit error:', err)

      // Pesan error yang ramah pengguna
      if (err.name === 'ZodError') {
        const msg = err.issues?.map((e) => e.message).join(', ')
        setSubmitError(`Data tidak valid: ${msg}`)
      } else if (err.code === '42P01') {
        // Table doesn't exist — migration belum dijalankan
        setSubmitError('Tabel transactions belum tersedia. Pastikan migration sudah dijalankan.')
      } else {
        setSubmitError(err.message || 'Terjadi kesalahan. Silakan coba lagi.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [user, items, shippingData, paymentMethod, subtotal, openLogin])

  // ─── Clear cart setelah order sukses ─────────────────────────────────────
  const handleSuccessDone = () => {
    dispatch({ type: 'CLEAR' })
  }

  // ─── Guard: belum login ───────────────────────────────────────────────────
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

  // ─── Guard: keranjang kosong ──────────────────────────────────────────────
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

        {/* Error banner dari submit */}
        {submitError && (
          <div className="mb-6 max-w-3xl mx-auto bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold px-5 py-4 rounded-xl flex items-start gap-3">
            <span className="text-lg shrink-0">⚠️</span>
            <span>{submitError}</span>
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
                  isSubmitting={isSubmitting}
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
                Terima kasih atas pesanan Anda. Pesanan telah tersimpan dan sedang diproses.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-surface rounded-2xl p-6 border border-gray-100 text-left space-y-3.5">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">ID Transaksi</span>
                <span className="font-display font-extrabold text-deep">
                  {confirmedOrder?.order_code ?? '—'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Nama Penerima</span>
                <span className="font-bold text-deep">{shippingData.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Metode Pembayaran</span>
                <span className="font-bold text-primary uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Kurir</span>
                <span className="font-bold text-deep uppercase">{shippingData.courier}</span>
              </div>
              <div className="h-0.5 bg-gray-200"></div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-400 font-bold uppercase tracking-wider">Total Pembayaran</span>
                <span className="font-display font-black text-primary text-base sm:text-lg">
                  {formatPrice(subtotal + shippingData.courierCost)}
                </span>
              </div>
            </div>

            <p className="text-xs text-primary font-semibold leading-relaxed">
              *Detail pengiriman dan nomor resi akan dikirim melalui SMS/WhatsApp ke nomor {shippingData.phone}.
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

// ─── Utility: cek apakah string adalah UUID v4 yang valid ─────────────────
function isValidUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}
