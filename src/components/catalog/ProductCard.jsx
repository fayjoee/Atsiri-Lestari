import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartDispatch, formatPrice } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function ProductCard({ product }) {
  const dispatch = useCartDispatch()
  const { user, openLogin } = useAuth()
  const [imgError, setImgError] = useState(false)


  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      openLogin()
      return
    }
    dispatch({ type: 'ADD', product, quantity: 1 })
  }


  // Get color for category badges
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'limbah-padat':
        return 'bg-amber-900/40 text-amber-300 border-amber-800/40'
      case 'limbah-cair':
        return 'bg-blue-900/40 text-blue-300 border-blue-800/40'
      case 'produk-turunan':
        return 'bg-emerald-950 text-accent border-emerald-800/40'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link 
      to={`/katalog/${product.id}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 relative"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${getCategoryColor(product.category)}`}>
          {product.categoryLabel}
        </span>
        
        {/* Product image with fallback to emoji */}
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 relative group-hover:scale-105 transition-transform duration-500">
            <div className={`w-3/4 h-3/4 rounded-full flex items-center justify-center text-4xl shadow-inner ${
              product.category === 'limbah-padat' ? 'bg-amber-100/60' : 
              product.category === 'limbah-cair' ? 'bg-blue-50/80' : 'bg-emerald-50/80'
            }`}>
              {product.category === 'limbah-padat' ? '🪵' : 
               product.category === 'limbah-cair' ? '💧' : '♻️'}
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              {product.plant && (
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-md">
                  Tumbuhan: {product.plant}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Wholesale indicator */}
        {product.isWholesale && (
          <div className="absolute top-3 right-3 bg-accent text-deep font-sans font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
            Grosir
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-3 text-left">
        <div className="space-y-1">
          {/* Seller / Toko Name */}
          <div className="flex items-center space-x-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            <span>🏪</span>
            <span>{product.sellerName || 'CV. Aroma Nusantara'}</span>
          </div>
          <h3 className="font-display font-bold text-deep group-hover:text-primary transition-colors text-base line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 h-8">
            {product.description}
          </p>
        </div>

        {/* Rating and Stock */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center text-amber-500 font-semibold space-x-1">
            <span>★</span>
            <span className="text-gray-700">{product.rating}</span>
            <span className="text-gray-400">({product.reviewCount})</span>
          </div>
          <div className={`font-semibold ${product.stock > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
            {product.stock > 0 ? `Stok: ${product.stock} ${product.unit}` : 'Habis'}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Harga Tetap</span>
            <span className="font-display font-black text-primary text-base sm:text-lg">
              {formatPrice(product.price)}
              <span className="text-xs font-normal text-gray-500">/{product.unit}</span>
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2.5 rounded-xl bg-accent text-deep hover:bg-accent-hover transition-colors font-bold disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer shadow-sm active:scale-95 duration-100"
            title="Tambah ke Keranjang"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}
