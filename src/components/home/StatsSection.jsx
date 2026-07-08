import { useEffect, useState } from 'react'

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: 97,
      suffix: '%',
      label: 'Bahan Baku Penyulingan Menjadi Limbah',
      sublabel: 'Rata-rata 97% massa tanaman atsiri terbuang begitu saja setelah disuling uap.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      id: 2,
      value: 10,
      suffix: '+',
      label: 'Ubah Limbah Jadi Produk Bernilai Tinggi',
      sublabel: 'Dari briket, kompos organik, pestisida nabati, hingga disinfektan aromatik.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
        </svg>
      ),
    },
    {
      id: 3,
      value: 500,
      suffix: '+',
      label: 'Petani & Penyuling Mitra Terbantu',
      sublabel: 'Meningkatkan pendapatan kelompok tani lokal melalui sirkular ekonomi.',
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-primary py-20 relative overflow-hidden border-t border-primary-light/30">
      <div className="absolute inset-0 bg-[radial-gradient(#14553B_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-bold text-accent tracking-widest text-sm uppercase">Dampak Nyata</h2>
          <p className="font-display font-extrabold text-3xl sm:text-4xl text-white">Mengapa Bioekonomi Sirkular Penting?</p>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-primary-dark/50 border border-primary-light/40 rounded-2xl p-8 text-center space-y-4 transform hover:scale-[1.03] transition-all duration-300 shadow-xl flex flex-col items-center justify-between"
            >
              <div className="w-16 h-16 rounded-full bg-primary-light/60 flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight flex justify-center items-baseline">
                  <span>{stat.value}</span>
                  <span className="text-accent text-4xl font-extrabold ml-1">{stat.suffix}</span>
                </div>
                <div className="font-display font-bold text-accent text-lg sm:text-xl px-2">
                  {stat.label}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mt-2">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
