import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import ChatWidget from './components/chatbot/ChatWidget'
import LoginModal from './components/auth/LoginModal'

// Pages
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import TutorialsPage from './pages/TutorialsPage'
import TutorialDetailPage from './pages/TutorialDetailPage'
import SellerDashboardPage from './pages/SellerDashboardPage'

// Scroll To Top on navigation
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen relative font-sans text-deep bg-white selection:bg-accent/40 selection:text-deep">
      <ScrollToTop />
      
      {/* Navbar with Cart Open trigger */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Pages Container */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/katalog" element={<CatalogPage />} />
          <Route path="/katalog/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/tutorial" element={<TutorialsPage />} />
          <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
          <Route path="/jual" element={<SellerDashboardPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating 24/7 AI Chatbot Widget */}
      <ChatWidget />

      {/* Login Authentication Modal overlay */}
      <LoginModal />
    </div>
  )
}

