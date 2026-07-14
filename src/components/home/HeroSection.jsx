import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center pt-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-light/30 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Jual &amp; Beli Limbah Atsiri, Mudah dan <span className="text-accent">Menguntungkan</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              Atsiri Lestari hadir sebagai tempat belanja dan jual limbah hasil penyulingan atsiri — ampas, hydrosol, hingga produk olahannya. Cocok untuk penyuling yang ingin menambah penghasilan dan pembeli yang butuh bahan baku berkualitas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/katalog"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-deep gradient-accent shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 active:translate-y-0 text-center"
              >
                Lihat Daftar Limbah
                <svg className="w-5 h-5 ml-2.5 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
              <Link
                to="/tutorial"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-light text-base font-bold rounded-xl text-white bg-primary/20 backdrop-blur-sm hover:bg-primary-light/40 hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-center"
              >
                Cara Mengolah Limbah
              </Link>
            </div>
          </div>

          {/* Graphical/Interactive illustration */}
          <div className="lg:col-span-5 flex justify-center animate-fade-in delay-200">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Outer decorative circle with dashed outline */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30 animate-spin" style={{ animationDuration: '30s' }}></div>
              <div className="absolute inset-4 rounded-full border border-primary-light/50 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>

              {/* Inner glowing circle */}
              <div className="absolute inset-10 bg-gradient-to-tr from-primary-light/40 to-accent/20 rounded-full blur-2xl"></div>

              {/* Central Leaf/Drop SVG Icon */}
              <div className="absolute inset-12 bg-deep/90 border border-primary-light/60 rounded-full flex flex-col items-center justify-center shadow-2xl p-6 text-center group">
                <svg className="w-24 h-24 text-accent transition-transform duration-500 group-hover:scale-110 animate-float" viewBox="0 0 64 64" fill="none">
                  <path d="M32 10 C26 22, 16 30, 16 38 C16 48, 23 54, 32 54 C41 54, 48 48, 48 38 C48 30, 38 22, 32 10Z" fill="currentColor" opacity="0.15" />
                  <path d="M32 12 C28 20, 20 28, 20 36 C20 44, 25 50, 32 50 C39 50, 44 44, 44 36 C44 28, 36 20, 32 12Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 20 C32 20, 27 26, 27 34 C27 40, 32 44, 32 44" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 12 L32 50" stroke="currentColor" strokeWidth="1.5" stroke-dasharray="4 4" opacity="0.5" />
                </svg>
                <div className="mt-4 font-display font-bold text-white text-lg tracking-wide uppercase">Limbah Atsiri</div>
                <div className="text-accent text-xs font-semibold tracking-widest uppercase mt-0.5">Bernilai & Lestari</div>
              </div>

              {/* Mini cards floating around */}
              <div className="absolute top-2 -left-8 bg-deep border border-primary-light/60 p-3 rounded-lg shadow-xl flex items-center space-x-2 animate-float">
                <span className="text-2xl">🌾</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Limbah Padat</div>
                  <div className="text-xs font-extrabold text-white">Ampas Nilam, Sereh...</div>
                </div>
              </div>

              <div className="absolute bottom-6 -right-8 bg-deep border border-primary-light/60 p-3 rounded-lg shadow-xl flex items-center space-x-2 animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">💧</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Limbah Cair</div>
                  <div className="text-xs font-extrabold text-white">Hydrosol Cengkeh...</div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-12 bg-deep border border-primary-light/60 p-3 rounded-lg shadow-xl flex items-center space-x-2 animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-2xl">♻️</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Produk Olahan</div>
                  <div className="text-xs font-extrabold text-white">Briket &amp; Pupuk Organik</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[50px] text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V30.27C1124.4,52.2,1060.2,74.1,985.66,92.83Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  )
}
