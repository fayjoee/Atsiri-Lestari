import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import SpecTable from '../components/catalog/SpecTable'
import { useCartDispatch, formatPrice } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useCartDispatch()
  const { user, openLogin } = useAuth()
  const [quantity, setQuantity] = useState(1)

  const product = useMemo(() => {
    return getProductById(Number(id))
  }, [id])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4 bg-[#FAF6EE]">
        <span className="text-5xl">⚠️</span>
        <h2 className="font-display font-bold text-deep text-xl">Produk Tidak Ditemukan</h2>
        <Link to="/katalog" className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-light">
          Kembali ke Katalog
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      openLogin()
      return
    }
    dispatch({ type: 'ADD', product, quantity })
  }

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-gray-500 font-semibold mb-8 text-left">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link to="/katalog" className="hover:text-primary transition-colors">Katalog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
          {/* Image area */}
          <div className="bg-primary/5 rounded-3xl p-12 aspect-square flex items-center justify-center text-8xl shadow-inner select-none relative">
            {product.category === 'limbah-padat' ? '🪵' : product.category === 'limbah-cair' ? '💧' : '♻️'}
            {product.isWholesale && (
              <span className="absolute top-6 right-6 bg-accent text-deep font-sans font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-lg shadow">
                Grosir B2B Ready
              </span>
            )}
          </div>

          {/* Product Info content */}
          <div className="text-left space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/5 border border-primary-light/10 px-3 py-1 rounded-full">
                {product.categoryLabel}
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-deep leading-tight pt-1">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pt-1.5">
                <div className="flex items-center space-x-1.5 text-primary font-bold">
                  <span>🏪 Vendor:</span>
                  <span className="underline decoration-accent underline-offset-4">{product.sellerName || 'CV. Aroma Nusantara'}</span>
                </div>
                <span className="hidden sm:inline text-gray-300">|</span>
                <div className="flex items-center space-x-2">
                  <span className="text-amber-500 text-base">★</span>
                  <span className="font-bold text-gray-700">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} ulasan)</span>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-5 bg-surface border border-gray-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Harga Tetap (Fixed Price)</span>
                  <span className="font-display font-black text-primary text-2xl sm:text-3xl">
                    {formatPrice(product.price)}
                    <span className="text-sm font-normal text-gray-500">/{product.unit}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Ketersediaan</span>
                  <span className={`text-sm font-extrabold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {product.stock > 0 ? `Ready: ${product.stock} ${product.unit}` : 'Habis'}
                  </span>
                </div>
              </div>

              {/* Wholesale Pricing Alert */}
              {product.isWholesale && (
                <div className="pt-3 border-t border-gray-200 text-xs sm:text-sm text-gray-600 space-y-1">
                  <p className="font-bold text-primary">💼 Khusus Pembelian Grosir B2B:</p>
                  <p>Min. Pembelian: <span className="font-bold text-deep">{product.wholesaleMinQty} {product.unit}</span></p>
                  <p>Harga Grosir: <span className="font-bold text-emerald-600">{formatPrice(product.wholesalePrice)}/{product.unit}</span></p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-display font-bold text-deep text-sm uppercase tracking-wider">Deskripsi Komoditas</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Solution tag for waste */}
            {product.solutions && product.solutions.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-display font-bold text-deep text-sm uppercase tracking-wider">Potensi Solusi Turunan</h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.solutions.map((sol, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-xl text-xs font-semibold">
                      ♻️ {sol}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-xl shrink-0 h-14 bg-white justify-between px-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-gray-500 hover:text-primary transition-colors text-lg font-black focus:outline-none cursor-pointer"
                >
                  -
                </button>
                <span className="px-5 text-base font-bold text-deep">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-3 py-1.5 text-gray-500 hover:text-primary transition-colors text-lg font-black focus:outline-none cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-14 bg-primary hover:bg-primary-light text-white font-bold rounded-xl text-sm sm:text-base shadow-md hover:shadow-primary/20 transition-all duration-300 transform active:scale-98 flex items-center justify-center cursor-pointer"
              >
                Masukkan ke Keranjang Belanja
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mb-16">
          <SpecTable specs={product.specs} />
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16 text-left space-y-8">
            <h2 className="font-display font-extrabold text-2xl text-deep">Produk Terkait Kategori</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>{p.categoryLabel}</span>
                      <span>🏪 {p.sellerName || 'CV. Aroma'}</span>
                    </div>
                    <h4 className="font-bold text-deep text-sm line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">{formatPrice(p.price)}</span>
                    <Link to={`/katalog/${p.id}`} className="text-xs font-bold text-accent hover:underline">
                      Detail →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
