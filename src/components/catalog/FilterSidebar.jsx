import { categories } from '../../data/products'

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onChangeSearch,
  priceRange,
  onChangePriceRange,
  onResetFilters,
  maxPriceLimit
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-8 sticky top-24">
      {/* Search Input */}
      <div className="space-y-2.5">
        <label htmlFor="search" className="block text-xs font-bold text-deep uppercase tracking-wider">
          Cari Produk
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Ketik nama produk..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm transition-colors"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <span className="block text-xs font-bold text-deep uppercase tracking-wider">
          Kategori Komoditas
        </span>
        <div className="space-y-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-all ${
              selectedCategory === null
                ? 'bg-primary border-primary text-white shadow-sm shadow-primary/20'
                : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Semua Komoditas</span>
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary border-primary text-white shadow-sm shadow-primary/20'
                  : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center space-x-2.5">
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-md ${
                selectedCategory === cat.id ? 'bg-primary-light text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="block text-xs font-bold text-deep uppercase tracking-wider">
            Batas Harga
          </span>
          <span className="text-xs font-semibold text-primary">
            Maks: Rp {priceRange.toLocaleString('id-ID')}
          </span>
        </div>
        <input
          type="range"
          min="2000"
          max={maxPriceLimit || 150000}
          step="1000"
          value={priceRange}
          onChange={(e) => onChangePriceRange(Number(e.target.value))}
          className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          <span>Rp 2.000</span>
          <span>Rp {(maxPriceLimit || 150000).toLocaleString('id-ID')}</span>
        </div>
      </div>


      {/* Reset Filter Button */}
      <button
        onClick={onResetFilters}
        className="w-full py-3 border-2 border-gray-200 hover:border-rose-500 hover:text-rose-500 text-gray-600 rounded-xl text-sm font-bold transition-all active:scale-95 duration-100 cursor-pointer text-center"
      >
        Hapus Semua Filter
      </button>
    </div>
  )
}
