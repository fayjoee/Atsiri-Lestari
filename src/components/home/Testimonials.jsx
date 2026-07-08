import { useState } from 'react'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="bg-surface py-20 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="font-display font-bold text-primary tracking-widest text-sm uppercase">Kisah Sukses</h2>
          <p className="font-display font-extrabold text-3xl sm:text-4xl text-deep">Kabar Dari Mitra & Konsumen</p>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xl transition-all duration-500 animate-scale-in">
          {/* Quote Icon */}
          <div className="text-accent text-6xl font-serif leading-none absolute top-4 left-6 opacity-30 select-none">“</div>
          
          <div className="space-y-6 relative z-10">
            {/* Rating */}
            <div className="flex justify-center space-x-1 text-amber-400 text-lg">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-gray-700 text-base sm:text-lg lg:text-xl italic font-medium leading-relaxed px-4">
              "{testimonials[activeIndex].quote}"
            </p>

            {/* Profile */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full border-2 border-accent overflow-hidden shadow-md flex items-center justify-center bg-primary text-white text-xl font-bold">
                {testimonials[activeIndex].name[0]}
              </div>
              <div>
                <h4 className="font-display font-extrabold text-deep text-base sm:text-lg">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-xs sm:text-sm text-primary font-semibold">
                  {testimonials[activeIndex].role}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-0.5">
                  {testimonials[activeIndex].location}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-4 hidden sm:flex">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-primary hover:bg-accent hover:text-deep transition-all duration-300 transform active:scale-95 focus:outline-none"
              aria-label="Sebelumnya"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-primary hover:bg-accent hover:text-deep transition-all duration-300 transform active:scale-95 focus:outline-none"
              aria-label="Selanjutnya"
            >
              →
            </button>
          </div>
        </div>

        {/* Bullet indicators */}
        <div className="flex justify-center space-x-2.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                index === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Lihat slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
import { testimonials as testMock } from '../../data/testimonials'
