import { formatPrice } from '../../context/CartContext'

export default function TutorialDetail({ tutorial }) {
  if (!tutorial) return null

  return (
    <div className="space-y-10 text-left">
      {/* Overview Block */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-4">
          <div className="inline-flex space-x-2.5">
            <span className="bg-primary text-accent text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              Kesulitan: {tutorial.difficulty}
            </span>
            <span className="bg-primary-light text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full">
              Waktu: {tutorial.duration}
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-deep leading-tight">
            {tutorial.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {tutorial.description}
          </p>
        </div>

        {/* Thumbnail Badge Graphic */}
        <div className="flex justify-center bg-primary/5 rounded-2xl p-6 aspect-video md:aspect-square text-6xl shadow-inner">
          {tutorial.title.includes('Briket') ? '🪵🔥' : 
           tutorial.title.includes('Kompos') ? '🌱♻️' : 
           tutorial.title.includes('Disinfektan') ? '🧪💧' : 
           tutorial.title.includes('Pestisida') ? '🌾🐛' : 
           tutorial.title.includes('Sabun') ? '🧼🧼' : '🧴✨'}
        </div>
      </div>

      {/* Tools & Materials split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tools Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3 flex items-center space-x-2">
            <span>🛠️</span>
            <span>Alat yang Diperlukan</span>
          </h3>
          <ul className="divide-y divide-gray-100 text-sm text-gray-700">
            {tutorial.tools.map((tool, idx) => (
              <li key={idx} className="py-3 flex items-center space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Materials Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-deep text-lg border-b border-gray-100 pb-3 flex items-center space-x-2">
            <span>📦</span>
            <span>Bahan yang Dibutuhkan</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
              <thead>
                <tr className="text-gray-500 font-bold">
                  <th className="pb-2">Nama Bahan</th>
                  <th className="pb-2">Jumlah</th>
                  <th className="pb-2 text-right">Estimasi Biaya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tutorial.materials.map((mat, idx) => (
                  <tr key={idx} className="text-gray-700">
                    <td className="py-3 font-semibold">{mat.name}</td>
                    <td className="py-3">{mat.quantity} {mat.unit}</td>
                    <td className="py-3 text-right font-semibold text-primary">
                      {formatPrice(mat.estimatedCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold">
            <span className="text-gray-600">Total Biaya Bahan</span>
            <span className="text-primary text-base font-black">
              {formatPrice(tutorial.totalEstimatedCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Critical Technical Mitigations Alert Callout (Indonesian) */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-950 space-y-3.5">
        <h4 className="font-display font-bold text-rose-900 flex items-center space-x-2">
          <span>⚠️</span>
          <span>Catatan Teknis & Mitigasi Risiko Kegagalan</span>
        </h4>
        <div className="text-xs sm:text-sm leading-relaxed space-y-2">
          <p className="font-medium">
            Minyak sisa hasil penyulingan yang terperangkap pada ampas dapat menghambat fermentasi mikroba atau merusak kualitas briket. Harap perhatikan mitigasi berikut:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {tutorial.risks.map((risk, idx) => (
              <li key={idx}>
                <span className="font-bold text-rose-900">{risk.risk}:</span> {risk.mitigation}
              </li>
            ))}
          </ul>
          {tutorial.technicalNotes && (
            <p className="pt-2 border-t border-rose-200/50 italic text-[11px] sm:text-xs text-rose-800">
              *Catatan Tambahan: {tutorial.technicalNotes}
            </p>
          )}
        </div>
      </div>

      {/* Step by Step Guide */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-display font-bold text-deep text-lg sm:text-xl border-b border-gray-100 pb-3 flex items-center space-x-2">
          <span>📝</span>
          <span>Instruksi Langkah Demi Langkah</span>
        </h3>
        <div className="space-y-6">
          {tutorial.steps.map((step) => (
            <div key={step.stepNumber} className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <span className="w-8 h-8 rounded-full bg-primary text-accent font-display font-black text-sm flex items-center justify-center shrink-0">
                {step.stepNumber}
              </span>
              <div className="space-y-1 text-left flex-1">
                <h4 className="font-bold text-deep text-base">{step.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.description}</p>
                {step.tips && (
                  <div className="bg-primary/5 text-primary text-xs font-semibold px-3.5 py-2 rounded-lg mt-2 italic flex items-center">
                    <span className="mr-1.5 font-bold">💡 Tips:</span> {step.tips}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profit Simulation and Economy Section */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-display font-bold text-deep text-lg sm:text-xl border-b border-gray-100 pb-3 flex items-center space-x-2">
          <span>📈</span>
          <span>Simulasi Analisis Keuntungan Ekonomi</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Simulasi di bawah didasarkan pada skala produksi standard per batch ampas minyak atsiri.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-xl p-5 border border-gray-100 text-center space-y-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Skala Batch Produksi</span>
            <p className="font-display font-extrabold text-primary text-xl sm:text-2xl">{tutorial.profitSimulation.batchSize}</p>
          </div>
          <div className="bg-surface rounded-xl p-5 border border-gray-100 text-center space-y-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimasi Modal per Batch</span>
            <p className="font-display font-extrabold text-rose-600 text-xl sm:text-2xl">{formatPrice(tutorial.profitSimulation.costPerBatch)}</p>
          </div>
          <div className="bg-surface rounded-xl p-5 border border-gray-100 text-center space-y-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Potensi Pendapatan per Batch</span>
            <p className="font-display font-extrabold text-emerald-600 text-xl sm:text-2xl">{formatPrice(tutorial.profitSimulation.revenuePerBatch)}</p>
          </div>
        </div>

        <div className="overflow-hidden border border-gray-100 rounded-xl bg-surface p-6 space-y-4">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-gray-700">Simulasi Margin Keuntungan</span>
            <span className="font-display font-black text-emerald-600 text-lg sm:text-xl">{tutorial.profitMargin}</span>
          </div>
          <div className="h-0.5 bg-gray-200"></div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-gray-700">Laba Bersih per Batch</span>
            <span className="font-display font-black text-emerald-600 text-lg sm:text-xl">
              {formatPrice(tutorial.profitSimulation.profitPerBatch)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-bold text-gray-700">Estimasi Laba Bersih Bulanan ({tutorial.profitSimulation.monthlyBatches} Batch)</span>
            <span className="font-display font-black text-primary text-xl sm:text-2xl">
              {formatPrice(tutorial.profitSimulation.monthlyProfit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
