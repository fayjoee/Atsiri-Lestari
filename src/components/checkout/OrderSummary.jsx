import { useCart, formatPrice } from '../../context/CartContext'

export default function OrderSummary({ courierCost }) {
  const { items, subtotal, shippingCost: baseShipping } = useCart()

  // Use selected courier cost if available, otherwise fallback to default base shipping
  const shipping = baseShipping === 0 ? 0 : (courierCost !== undefined ? courierCost : baseShipping)
  const total = subtotal + shipping

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
      <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3">
        Ringkasan Pesanan
      </h3>

      {/* Cart Items List */}
      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="py-3.5 flex items-center space-x-3.5">
            {/* Thumbnail representation */}
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg shrink-0 flex items-center justify-center text-xl">
              {item.name.includes('Ampas') ? '🪵' : item.name.includes('Limbah Cair') ? '💧' : '♻️'}
            </div>
            
            <div className="flex-1 min-w-0 text-left">
              <h4 className="font-bold text-deep text-sm truncate">{item.name}</h4>
              <p className="text-xs text-gray-500 font-medium">
                {item.quantity} {item.unit} × {formatPrice(item.price)}
              </p>
            </div>

            <span className="font-semibold text-deep text-sm">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="pt-4 border-t border-gray-200 space-y-2.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-deep">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Ongkos Kirim</span>
          <span className="font-semibold text-deep">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold">GRATIS</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {baseShipping === 0 && (
          <p className="text-[10px] text-emerald-600 font-semibold text-right leading-none">
            *Apresiasi belanja di atas Rp500.000 (Gratis Ongkir)
          </p>
        )}
        <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-black text-deep">
          <span>Total Tagihan</span>
          <span className="text-primary text-lg sm:text-xl font-black">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}
