import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-deep text-gray-300 pt-16 pb-8 border-t border-primary-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo-dark.png"
                alt="Atsiri Lestari"
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-wider text-white">ATSIRI</span>
                <span className="font-sans text-xs font-semibold text-accent tracking-widest -mt-1">LESTARI</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-md text-sm sm:text-base">
              Atsiri Lestari adalah toko jual beli limbah hasil penyulingan atsiri. Membantu penyuling lokal menjual ampas dan hydrosol, serta memudahkan pembeli mendapatkan bahan baku berkualitas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-accent transition-colors duration-200">Beranda</Link>
              </li>
              <li>
                <Link to="/katalog" className="hover:text-accent transition-colors duration-200">Katalog Produk</Link>
              </li>
              <li>
                <Link to="/tutorial" className="hover:text-accent transition-colors duration-200">Tutorial Pengolahan</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">Gedung Pusat Agroekologi, Lt. 3, Aceh</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">kontak@atsirilestari.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-light/10 text-center flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Atsiri Lestari. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors duration-200">Kebijakan Privasi</a>
            <a href="#" className="hover:text-accent transition-colors duration-200">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
