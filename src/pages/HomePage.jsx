import HeroSection from '../components/home/HeroSection'
import StatsSection from '../components/home/StatsSection'
import FeaturedProducts from '../components/home/FeaturedProducts'

export default function HomePage() {
  return (
    <div className="bg-[#FAF6EE] min-h-screen">

      {/* Hero Banner */}
      <HeroSection />

      {/* Fakta Menarik */}
      <StatsSection />

      {/* Limbah Pilihan */}
      <FeaturedProducts />

    </div>
  )
}
