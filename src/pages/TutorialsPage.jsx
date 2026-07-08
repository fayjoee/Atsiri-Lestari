import { useState, useMemo } from 'react'
import { tutorials } from '../data/tutorials'
import TutorialCard from '../components/tutorials/TutorialCard'

export default function TutorialsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  const filteredTutorials = useMemo(() => {
    if (!selectedDifficulty) return tutorials
    return tutorials.filter(t => t.difficulty === selectedDifficulty)
  }, [selectedDifficulty])

  return (
    <div className="bg-[#FAF6EE] min-h-screen pt-24 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left space-y-3 mb-12">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-deep">
            Panduan Pengolahan Praktis
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-3xl leading-relaxed">
            Modul edukasi sirkular buatan para pakar agroekologi untuk membantu petani lokal menyulap ampas & limbah kondensasi minyak atsiri menjadi produk komersial bernilai jual tinggi.
          </p>
          <div className="h-1 w-20 bg-accent rounded-full"></div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3.5 mb-10 border-b border-gray-100 pb-6 text-left">
          <span className="text-xs font-bold text-deep uppercase tracking-wider block sm:inline mr-2">
            Tingkat Kesulitan:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === null
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Semua Modul
            </button>
            {['Mudah', 'Menengah', 'Sulit'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} className="animate-fade-in-up">
              <TutorialCard tutorial={tutorial} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
