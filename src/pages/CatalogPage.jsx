import { useState, useMemo } from 'react'
import { products, categories } from '../data/products'
import ProductCard from '../components/catalog/ProductCard'
import FilterSidebar from '../components/catalog/FilterSidebar'

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState(150000)
  
  // Interactive Solution Modal State
  const [solutionModalPlant, setSolutionModalPlant] = useState(null)

  // Focus solutions dictionary per plant requested in guidelines
  const plantSolutions = {
    'Sereh Wangi': {
      solutions: 'Biopestisida, Mulsa Organik, Briket Biomassa, Pengusir Nyamuk Bakar',
      desc: 'Ampas sereh wangi kaya akan serat selulosa dan kandungan residual sitronela. Ampas ini dapat langsung diaplikasikan sebagai mulsa pertanian untuk mengendalikan rumput liar, atau diolah menjadi briket arang aromatik bernilai kalor tinggi yang aman bagi pernapasan.'
    },
    'Nilam': {
      solutions: 'Kompos Organik Premium, Briket Biomassa, Papan Partikel Konstruksi, Sabun Herbal',
      desc: 'Lignoselulosa tinggi dalam ampas distilasi daun nilam menjadikannya media yang sangat subur setelah didekomposisi. Dapat dipress menjadi papan partikel ringan atau briket arang aromaterapi penolak serangga.'
    },
    'Cengkeh': {
      solutions: 'Antimikroba Alami, Bahan Aditif Batu Bata Interlok, Disinfektan Serbaguna, Obat Kumur',
      desc: 'Residual eugenol yang tertinggal pada ampas padat dan cair cengkeh memiliki sifat antibakteri alami yang sangat kuat. Ampas padat cengkeh juga dapat dikeringkan dan dicampurkan ke adonan batu bata untuk ketahanan jamur jangka panjang.'
    },
    'Pala': {
      solutions: 'Sirup/Teh Rempah Aromatik, Karbon Aktif (Adsorben), Lotion Herbal, Campuran Pakan Ternak',
      desc: 'Biji pala residual setelah disuling masih memiliki kandungan antioksidan tinggi yang aman untuk dikonsumsi sebagai minuman herbal ringan (teh rempah). Ampasnya juga dapat diarangkan menjadi karbon aktif penyerap logam berat.'
    },
    'Kayu Putih': {
      solutions: 'Cairan Pembersih & Disinfektan, Mulsa Kebun, Bahan Balsem Aromatik',
      desc: 'Residual sineol pada limbah cair dan padat kayu putih memberikan aroma segar melegakan pernapasan serta berfungsi sebagai antiseptik permukaan serbaguna.'
    },
    'Gaharu': {
      solutions: 'Dupa & Hio Premium, solid perfume, aromaterapi',
      desc: 'Resin aromatik gaharu yang mengendap pada serat kayu tidak sepenuhnya hilang saat distilasi. Bubuk kering ampas gaharu bernilai sangat tinggi di pasar ekspor untuk bahan dupa wewangian relaksasi.'
    },
    'Cendana': {
      solutions: 'Pengharum Ruangan Reed Diffuser, Dupa Aromaterapi, Toner Kulit',
      desc: 'Minyak santalol residual pada serat cendana menghasilkan keharuman creamy mewah yang menenangkan. Ampasnya sangat dicari untuk bahan industri spa tradisional.'
    },
    'Pinus': {
      solutions: 'Papan Isolasi Panas, Media Tanam Hias, Bahan Tambahan Cat Alami',
      desc: 'Serat kasar pinus tahan air dan tidak disukai oleh serangga perusak kayu. Ampas pinus sangat baik sebagai isolator bangunan ramah lingkungan.'
    }
  }

  const maxPriceLimit = useMemo(() => {
    return Math.max(...products.map(p => p.price))
  }, [])

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }
      // Search Filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      // Price Filter
      if (product.price > priceRange) {
        return false
      }
      return true
    })
  }, [selectedCategory, searchTerm, priceRange])

  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSearchTerm('')
    setPriceRange(maxPriceLimit)
  }

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left space-y-3 mb-12">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-deep">
            Katalog Komoditas & Hasil Olahan
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-3xl leading-relaxed">
            Temukan stok limbah mentah berkualitas tinggi untuk industri B2B dengan harga tetap, serta produk jadi turunan siap pakai untuk kebutuhan retail Anda.
          </p>
          <div className="h-1 w-20 bg-accent rounded-full"></div>
        </div>

        {/* Catalog Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchTerm={searchTerm}
              onChangeSearch={setSearchTerm}
              priceRange={priceRange}
              onChangePriceRange={setPriceRange}
              onResetFilters={handleResetFilters}
              maxPriceLimit={maxPriceLimit}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-surface rounded-2xl border border-gray-100 p-12 text-center space-y-4">
                <span className="text-5xl">🔍</span>
                <div>
                  <h3 className="font-display font-bold text-deep text-lg">Produk Tidak Ditemukan</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
                    Coba sesuaikan kata kunci pencarian Anda atau naikkan batas range harga filter.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light transition-all cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Solutions Interactive Modal */}
      {solutionModalPlant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setSolutionModalPlant(null)}
            className="absolute inset-0 bg-deep/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          />
          {/* Content */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 text-left space-y-5 animate-scale-in">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-display font-bold text-primary text-lg flex items-center space-x-2">
                <span>🍃</span>
                <span>Fokus Solusi: {solutionModalPlant}</span>
              </h3>
              <button 
                onClick={() => setSolutionModalPlant(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3.5">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Potensi Olahan</span>
                <p className="font-bold text-emerald-600 text-sm sm:text-base leading-relaxed">
                  {plantSolutions[solutionModalPlant].solutions}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Deskripsi Manfaat</span>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                  {plantSolutions[solutionModalPlant].desc}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSolutionModalPlant(null)}
                className="w-full py-3 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-light transition-all cursor-pointer text-center"
              >
                Tutup Panduan Solusi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
