import { useState, useEffect, useRef } from 'react'
import { products } from '../../data/products'
import { tutorials } from '../../data/tutorials'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Halo! Selamat datang di Atsiri Lestari. Saya asisten pintar sirkular Anda. Ada yang bisa saya bantu hari ini?',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const quickReplies = [
    { text: 'Daftar Produk Limbah', value: 'daftar produk' },
    { text: 'Tutorial Buat Briket', value: 'tutorial briket' },
    { text: 'Cara Jual Limbah B2B', value: 'cara jual limbah' },
    { text: 'Info Kontak CS', value: 'kontak cs' },
  ]

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const getBotResponse = (input) => {
    const text = input.toLowerCase()
    
    // Greeting
    if (text.includes('halo') || text.includes('hai') || text.includes('hi ') || text.includes('pagi') || text.includes('siang') || text.includes('sore') || text.includes('malam')) {
      return 'Halo! Selamat datang kembali. Saya siap membantu Anda memahami pengolahan limbah atsiri atau mencarikan produk di katalog.'
    }

    // Products list
    if (text.includes('produk') || text.includes('katalog') || text.includes('beli') || text.includes('harga')) {
      const topProducts = products.filter(p => p.isFeatured).slice(0, 3)
      const list = topProducts.map(p => `• ${p.name} (${p.categoryLabel}): Rp ${p.price.toLocaleString('id-ID')}/${p.unit} (Stok: ${p.stock})`).join('\n')
      return `Berikut adalah beberapa produk unggulan di katalog kami:\n\n${list}\n\nAnda bisa melihat selengkapnya di halaman Katalog Produk.`
    }

    // Tutorials
    if (text.includes('tutorial') || text.includes('cara buat') || text.includes('bikin') || text.includes('olah') || text.includes('briket') || text.includes('kompos')) {
      const tutList = tutorials.slice(0, 3).map(t => `• ${t.title} (${t.difficulty})`).join('\n')
      return `Kami memiliki panduan lengkap langkah demi langkah untuk pembuatan produk turunan:\n\n${tutList}\n\nKunjungi halaman Tutorial Pengolahan untuk mempelajari selengkapnya.`
    }

    // B2B / Sell waste
    if (text.includes('jual') || text.includes('limbah') || text.includes('ampas') || text.includes('b2b') || text.includes('mitra')) {
      return 'Bagi mitra industri atau kelompok tani penyuling lokal, kami memfasilitasi transaksi grosir (B2B) dengan harga tetap untuk ampas kering/basah dan air kondensasi atsiri. Spesifikasi teknis seperti kadar air standar tertera lengkap di detail katalog.'
    }

    // CS WhatsApp / Contact
    if (text.includes('kontak') || text.includes('cs') || text.includes('admin') || text.includes('whatsapp') || text.includes('nomor')) {
      return 'Anda bisa menghubungi Layanan Pelanggan kami via WhatsApp di nomor +62 812-3456-7890 atau email ke kontak@atsirilestari.id untuk pertanyaan kemitraan B2B lebih lanjut.'
    }

    // Default
    return 'Maaf, saya tidak memahami pertanyaan tersebut. Anda bisa menggunakan tombol cepat di bawah atau mengetik tentang "produk", "tutorial", atau "kemitraan limbah".'
  }

  const handleSend = (text) => {
    if (!text.trim()) return

    // User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')

    // Bot Typing simulation
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotResponse(text),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-deep shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none animate-pulse-glow cursor-pointer"
        aria-label="Tanya AI Chatbot"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.83l1.207-4.961C4.305 13.917 3.375 12.015 3.375 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[480px] bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary text-white px-5 py-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-deep text-lg font-bold">
              🍃
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-sm sm:text-base leading-none">Asisten Atsiri</h3>
              <p className="text-[10px] text-accent font-semibold tracking-wider uppercase mt-1">Aktif 24/7 • Sirkular Bot</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line text-left shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-deep rounded-bl-none border border-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="mr-auto flex items-center space-x-1.5 bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Panel */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-1.5 border-t border-gray-100">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(reply.value)}
                  className="px-2.5 py-1.5 bg-white border border-gray-200 text-primary hover:border-primary hover:bg-primary/5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(inputValue)
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-primary rounded-xl text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-primary text-white hover:bg-primary-light disabled:bg-gray-100 disabled:text-gray-400 rounded-xl transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
