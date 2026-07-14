/**
 * Testimonial mock data untuk ATSIRI LESTARI
 * Data testimoni pengguna platform limbah penyulingan minyak atsiri
 */

export const testimonials = [
  {
    id: 1,
    name: 'Pak Slamet',
    role: 'Petani Sereh Wangi',
    location: 'Aceh',
    avatar: '/avatars/avatar-1.jpg',
    quote:
      'Dulu limbah sereh wangi cuma saya bakar di kebun, bikin asap tebal dan tetangga protes. Sejak kenal ATSIRI LESTARI, ternyata ampas itu ada harganya. Sekarang penghasilan tambahan dari limbah bisa buat bayar uang sekolah anak.',
    rating: 5,
    date: '2025-03-15T08:30:00.000Z',
  },
  {
    id: 2,
    name: 'Bu Ratna',
    role: 'Ketua Kelompok Tani Nilam',
    location: 'Aceh',
    avatar: '/avatars/avatar-2.jpg',
    quote:
      'Kelompok tani kami sekarang bikin kompos dari limbah nilam pakai panduan di platform ini. Hasilnya luar biasa, tanah jadi subur dan kami nggak perlu beli pupuk mahal lagi. Ibu-ibu di kelompok tani sampai semangat semua ikut belajar.',
    rating: 5,
    date: '2025-06-22T10:15:00.000Z',
  },
  {
    id: 3,
    name: 'Hendra Wijaya',
    role: 'Pemilik CV. Aroma Nusantara',
    location: 'Aceh',
    avatar: '/avatars/avatar-3.jpg',
    quote:
      'Sebagai pembeli bahan baku curah, saya butuh pasokan limbah penyulingan yang konsisten dan berkualitas. ATSIRI LESTARI memudahkan kami menemukan supplier terpercaya dari berbagai daerah. Proses negosiasi dan pemesanan jadi jauh lebih efisien.',
    rating: 4,
    date: '2025-09-10T14:00:00.000Z',
  },
  {
    id: 4,
    name: 'Ibu Dewi',
    role: 'Konsumen Retail',
    location: 'Aceh',
    avatar: '/avatars/avatar-4.jpg',
    quote:
      'Saya senang banget bisa beli produk ramah lingkungan dari limbah minyak atsiri di sini. Briket arang dari ampas cengkehnya wangi dan tahan lama. Rasanya ikut berkontribusi jaga lingkungan sambil dapat produk bagus.',
    rating: 5,
    date: '2025-12-05T09:45:00.000Z',
  },
  {
    id: 5,
    name: 'Pak Bambang',
    role: 'Penyuling Cengkeh',
    location: 'Aceh',
    avatar: '/avatars/avatar-5.jpg',
    quote:
      'Tadinya ampas cengkeh cuma numpuk di belakang rumah, bingung mau diapain. Setelah gabung di platform ini, saya bisa jual ke pembeli yang memang butuh. Lumayan, penghasilan tambahan Rp2-3 juta per bulan dari barang yang tadinya dianggap sampah.',
    rating: 5,
    date: '2026-02-18T11:20:00.000Z',
  },
  {
    id: 6,
    name: 'Siti Nurhaliza',
    role: 'Mahasiswa Pertanian, IPB University',
    location: 'Aceh',
    avatar: '/avatars/avatar-6.jpg',
    quote:
      'Tutorial di ATSIRI LESTARI sangat membantu riset skripsi saya tentang pemanfaatan limbah penyulingan. Materinya lengkap dan mudah dipahami, bahkan buat mahasiswa seperti saya. Dosennya sampai tanya saya dapat referensi dari mana.',
    rating: 4,
    date: '2026-05-30T16:00:00.000Z',
  },
];

/**
 * Mengembalikan 4 testimoni unggulan dengan rating tertinggi
 * Diurutkan berdasarkan rating (tertinggi) lalu tanggal (terbaru)
 * @returns {Array} 4 testimoni teratas
 */
export function getFeaturedTestimonials() {
  return [...testimonials]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 4);
}
