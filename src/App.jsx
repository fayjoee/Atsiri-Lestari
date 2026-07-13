import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import LoginModal from './components/auth/LoginModal'
import { useAuth } from './context/AuthContext'

// Pages
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import TutorialsPage from './pages/TutorialsPage'
import TutorialDetailPage from './pages/TutorialDetailPage'
import SellerDashboardPage from './pages/SellerDashboardPage'
import BecomeSellerPage from './pages/BecomeSellerPage'

// Scroll To Top on navigation
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Loading screen saat Supabase session pertama kali di-init
function AppLoader() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="w-12 h-12 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <p className="text-sm font-semibold text-gray-500 tracking-wide">Memuat Atsiri Lestari...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { loading } = useAuth()

  // Tampilkan loading screen saat Supabase session pertama kali dicek
  if (loading) {
    return <AppLoader />
  }

  return (
    <div className="flex flex-col min-h-screen relative font-sans text-deep bg-white selection:bg-accent/40 selection:text-deep">
      <ScrollToTop />

      {/* Navbar with Cart Open trigger */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Pages Container */}
      <main className="flex-grow">
        <Routes>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/katalog"             element={<CatalogPage />} />
          <Route path="/katalog/:id"         element={<ProductDetailPage />} />
          <Route path="/checkout"            element={<CheckoutPage />} />
          <Route path="/tutorial"            element={<TutorialsPage />} />
          <Route path="/tutorial/:id"        element={<TutorialDetailPage />} />

          {/* Seller routes */}
          <Route path="/menjadi-penjual"     element={<BecomeSellerPage />} />
          <Route path="/dashboard/seller"    element={<SellerDashboardPage />} />

          {/* Redirect route lama /jual ke dashboard seller */}
          <Route path="/jual"                element={<Navigate to="/dashboard/seller" replace />} />

          {/* Catch-all: 404 redirect ke beranda */}
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Login Modal overlay */}
      <LoginModal />
    </div>
  )
}
