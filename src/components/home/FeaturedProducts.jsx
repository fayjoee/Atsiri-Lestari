import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../catalog/ProductCard'

export default function FeaturedProducts() {
  const featured = products.filter(p => p.isFeatured).slice(0, 4)

  return (
    <section className="bg-white py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 space-y-4 md:space-y-0">
          <div className="space-y-2 text-left">
            <h2 className="font-display font-bold text-primary tracking-widest text-sm uppercase">Limbah Pilihan</h2>
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-deep">
              Yang Paling Banyak Dicari Pembeli
            </p>
            <div className="h-1 w-20 bg-accent rounded-full"></div>
          </div>
          <div>
            <Link
              to="/katalog"
              className="inline-flex items-center text-primary hover:text-primary-light font-bold transition-colors group"
            >
              Lihat Semua Limbah →
              <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <div key={product.id} className="animate-fade-in-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
