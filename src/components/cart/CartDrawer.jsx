import { useCart, useCartDispatch, formatPrice } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function CartDrawer({ isOpen, onClose }) {
  const { items, itemCount, subtotal, shippingCost, total } = useCart()
  const dispatch = useCartDispatch()
  const { user, openLogin } = useAuth()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-deep/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
            <h2 className="font-display font-bold text-lg sm:text-xl tracking-wide flex items-center">
              <span>Keranjang Belanja</span>
              <span className="ml-2.5 bg-accent text-deep text-xs font-black px-2.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-primary-light transition-colors text-white focus:outline-none cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-6xl">🛒</span>
                <div>
                  <h3 className="font-display font-bold text-deep text-lg">Keranjang Kosong</h3>
                  <p className="text-sm text-gray-500 max-w-xs mt-1">
                    Anda belum menambahkan produk ke keranjang belanja.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-light transition-all cursor-pointer"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  {/* Item Image representation */}
                  <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 shrink-0 flex items-center justify-center text-3xl">
                    {item.name.includes('Ampas') ? '🪵' : item.name.includes('Limbah Cair') ? '💧' : '♻️'}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-deep text-sm sm:text-base line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        {formatPrice(item.price)} / {item.unit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity - 1 })}
                          className="px-2.5 py-1 text-gray-500 hover:text-primary transition-colors text-sm font-black focus:outline-none cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-sm font-bold text-deep">{item.quantity}</span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity + 1 })}
                          className="px-2.5 py-1 text-gray-500 hover:text-primary transition-colors text-sm font-black focus:outline-none cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                        className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors focus:outline-none cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary (Sticky at bottom) */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 bg-surface px-6 py-6 space-y-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-deep">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-deep">
                    {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-[10px] text-primary font-semibold text-right leading-none">
                    *Belanja Rp500.000 lagi untuk Gratis Ongkir
                  </p>
                )}
                <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-bold text-deep">
                  <span>Total Pembayaran</span>
                  <span className="text-primary font-black">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => {
                    dispatch({ type: 'CLEAR' })
                  }}
                  className="flex-1 py-3.5 border-2 border-gray-200 hover:border-rose-500 hover:text-rose-500 text-gray-600 rounded-xl text-sm font-bold transition-all active:scale-95 duration-100 cursor-pointer text-center"
                >
                  Kosongkan
                </button>
                <Link
                  to={user ? "/checkout" : "#"}
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault()
                      onClose()
                      openLogin('/checkout')
                    } else {
                      onClose()
                    }
                  }}
                  className="flex-2 py-3.5 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm shadow-md hover:shadow-primary/20 transition-all duration-300 transform active:scale-95 text-center cursor-pointer"
                >
                  Lanjut ke Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
