import { useParams, Link } from 'react-router-dom'
import { getTutorialById } from '../data/tutorials'
import TutorialDetail from '../components/tutorials/TutorialDetail'

export default function TutorialDetailPage() {
  const { id } = useParams()
  const tutorial = getTutorialById(Number(id))

  if (!tutorial) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center space-y-4 bg-[#FAF6EE]">
        <span className="text-5xl">⚠️</span>
        <h2 className="font-display font-bold text-deep text-xl">Tutorial Tidak Ditemukan</h2>
        <Link to="/tutorial" className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-light">
          Kembali ke Panduan
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-28 pb-16">

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-gray-500 font-semibold mb-8 text-left">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span className="mx-2">/</span>
          <Link to="/tutorial" className="hover:text-primary transition-colors">Panduan</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate max-w-[200px] inline-block align-bottom">
            {tutorial.title}
          </span>
        </nav>

        {/* Tutorial Body */}
        <TutorialDetail tutorial={tutorial} />

        {/* Bottom Navigation */}
        <div className="pt-10 border-t border-gray-100 flex justify-between items-center mt-12 text-sm font-bold">
          <Link to="/tutorial" className="text-primary hover:underline flex items-center">
            ← Kembali ke Semua Panduan
          </Link>
          <Link to="/katalog" className="px-5 py-2.5 bg-accent text-deep hover:bg-accent-hover transition-colors rounded-xl shadow-sm text-xs sm:text-sm text-center">
            Cari Bahan Baku di Katalog
          </Link>
        </div>

      </div>
    </div>
  )
}
