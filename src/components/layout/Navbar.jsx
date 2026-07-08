import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onOpenCart }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { itemCount } = useCart()
  const { user, openLogin, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog Produk', path: '/katalog' },
    { name: 'Tutorial Pengolahan', path: '/tutorial' },
  ]

  // Add "Portal Penjual" link if user is logged in as seller or is seller-oriented
  if (user && user.type === 'seller') {
    navLinks.push({ name: 'Portal Penjualan', path: '/jual' })
  } else {
    navLinks.push({ name: 'Mulai Jual Limbah', path: '/jual' })
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      !isHome 
        ? 'bg-primary shadow-lg border-b border-primary-light/20 py-3' 
        : isScrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary-light/20 py-3' 
          : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <svg className="w-10 h-10 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" fill="#FFBD59"/>
              <path d="M32 12 C28 20, 20 28, 20 36 C20 44, 25 50, 32 50 C39 50, 44 44, 44 36 C44 28, 36 20, 32 12Z" fill="#0B3525"/>
              <path d="M32 22 C30 26, 26 30, 26 34 C26 38, 28 42, 32 42 C36 42, 38 38, 38 34 C38 30, 34 26, 32 22Z" fill="#FFBD59"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-wider text-white">ATSIRI</span>
              <span className="font-sans text-xs font-semibold text-accent tracking-widest -mt-1">LESTARI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors duration-200 text-sm ${
                  isActive(link.path)
                    ? 'text-accent border-b-2 border-accent pb-1'
                    : 'text-gray-100 hover:text-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart, Auth & Mobile Trigger */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-white hover:text-accent transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label="Keranjang Belanja"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-deep font-sans font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Authentication Buttons (Shopee Style) */}
            <div className="hidden md:flex items-center space-x-3 border-l border-primary-light/40 pl-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-white max-w-[120px] truncate">{user.name}</span>
                    <span className="text-[9px] text-accent font-semibold">{user.role}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 bg-primary-light hover:bg-rose-900 border border-primary-light/60 hover:border-rose-800 rounded-xl text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openLogin()}
                    className="px-3 py-1.5 text-xs font-bold text-white hover:text-accent transition-colors cursor-pointer"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => openLogin()}
                    className="px-4 py-1.5 bg-accent hover:bg-accent-hover text-deep font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:text-accent transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label="Menu Utama"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-lg border-b border-primary-light/20 animate-fade-in text-left">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-light text-accent'
                    : 'text-gray-100 hover:bg-primary-light hover:text-accent'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Status */}
            <div className="pt-4 border-t border-primary-light/40 mt-3 px-3">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-accent font-semibold">{user.role}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-2.5 bg-rose-900 border border-rose-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer text-center"
                  >
                    Keluar Akun
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openLogin()}
                    className="py-2.5 border border-primary-light/60 hover:bg-primary-light text-white font-bold rounded-xl text-xs text-center cursor-pointer"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => openLogin()}
                    className="py-2.5 bg-accent hover:bg-accent-hover text-deep font-bold rounded-xl text-xs text-center cursor-pointer"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
