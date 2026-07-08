import { Link } from 'react-router-dom'

export default function TutorialCard({ tutorial }) {
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Mudah':
        return 'bg-emerald-100 text-emerald-800'
      case 'Menengah':
        return 'bg-amber-100 text-amber-800'
      case 'Sulit':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link
      to={`/tutorial/${tutorial.id}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 relative"
    >
      {/* Visual illustration of card */}
      <div className="relative aspect-video w-full bg-primary/5 flex items-center justify-center text-4xl select-none">
        <span className="group-hover:scale-110 transition-transform duration-500">
          {tutorial.title.includes('Briket') ? '🪵🔥' : 
           tutorial.title.includes('Kompos') ? '🌱♻️' : 
           tutorial.title.includes('Disinfektan') ? '🧪💧' : 
           tutorial.title.includes('Pestisida') ? '🌾🐛' : 
           tutorial.title.includes('Sabun') ? '🧼🧼' : '🧴✨'}
        </span>
        <div className="absolute bottom-3 left-3 flex space-x-2">
          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
          <span className="text-[10px] bg-primary text-accent font-extrabold uppercase px-2.5 py-0.5 rounded-full">
            {tutorial.duration}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
        <div className="space-y-1.5 text-left">
          <h3 className="font-display font-bold text-deep group-hover:text-primary transition-colors text-base sm:text-lg line-clamp-2 leading-snug">
            {tutorial.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
            {tutorial.description}
          </p>
        </div>

        {/* Profit Simulation Sneak Peek */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="text-left">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Margin Keuntungan</span>
            <span className="font-display font-extrabold text-emerald-600 text-sm">
              {tutorial.profitMargin}
            </span>
          </div>
          <span className="text-xs font-bold text-primary group-hover:underline flex items-center">
            Pelajari →
          </span>
        </div>
      </div>
    </Link>
  )
}
