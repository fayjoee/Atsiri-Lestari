import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimonials from '../components/home/Testimonials'

export default function HomePage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen">

      {/* Hero Banner */}
      <HeroSection />

      {/* Impact Statistics */}
      <StatsSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials Slider */}
      <Testimonials />
    </div>
  )
}
