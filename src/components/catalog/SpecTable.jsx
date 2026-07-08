export default function SpecTable({ specs }) {
  if (!specs) return null

  // Map English keys to Indonesian labels for readability
  const labelMapping = {
    moistureContent: 'Kadar Air (Moisture Content)',
    dryingLevel: 'Tingkat Pengeringan',
    particleSize: 'Ukuran Partikel',
    color: 'Warna Standar',
    aroma: 'Aroma Khas',
    pH: 'Derajat Keasaman (pH)',
    activeCompound: 'Senyawa Aktif Sisa',
    volumePerBatch: 'Volume per Batch',
    density: 'Kerapatan Massa (Density)',
    weight: 'Berat Bersih',
    ingredients: 'Komposisi Bahan',
    shelfLife: 'Masa Simpan (Shelf Life)',
    certification: 'Sertifikasi / Standar',
    calorificValue: 'Nilai Kalor',
    burnTime: 'Durasi Pembakaran',
    npkContent: 'Kandungan NPK',
    cRatio: 'Rasio Karbon/Nitrogen',
    activeIngredient: 'Bahan Aktif',
    foamLevel: 'Tingkat Busa',
    dimensions: 'Dimensi Ukuran',
    waterResistance: 'Daya Tahan Air',
    targetPests: 'Hama Sasaran',
    coverageArea: 'Cakupan Area',
    effectiveDuration: 'Durasi Efektifitas',
    fragranceDuration: 'Durasi Keharuman',
  }

  return (
    <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-100 text-left text-sm sm:text-base">
        <thead className="bg-primary/5">
          <tr>
            <th scope="col" className="px-6 py-3.5 text-xs font-bold text-primary uppercase tracking-wider">
              Spesifikasi Teknis
            </th>
            <th scope="col" className="px-6 py-3.5 text-xs font-bold text-primary uppercase tracking-wider">
              Nilai Standar
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Object.entries(specs).map(([key, value], idx) => {
            const label = labelMapping[key] || key
            if (!value) return null
            return (
              <tr 
                key={key} 
                className={`transition-colors hover:bg-primary/5 ${idx % 2 === 0 ? 'bg-white' : 'bg-surface'}`}
              >
                <td className="px-6 py-4 font-semibold text-deep text-xs sm:text-sm">
                  {label}
                </td>
                <td className="px-6 py-4 text-gray-700 text-xs sm:text-sm">
                  {value}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
