// Tutorial data untuk platform ATSIRI LESTARI
// Panduan pengolahan limbah destilasi minyak atsiri

export const tutorials = [
  {
    id: 1,
    title: 'Pembuatan Briket dari Ampas Sereh Wangi',
    slug: 'pembuatan-briket-ampas-sereh-wangi',
    description:
      'Pelajari cara mengolah ampas sereh wangi sisa destilasi menjadi briket arang berkualitas tinggi sebagai bahan bakar alternatif. Briket dari ampas sereh wangi memiliki nilai kalor yang cukup tinggi dan dapat menggantikan penggunaan kayu bakar konvensional. Tutorial ini cocok untuk petani yang ingin memaksimalkan nilai ekonomi dari limbah destilasi.',
    difficulty: 'Menengah',
    duration: '4-6 Jam',
    category: 'Briket & Bahan Bakar',
    image: '/tutorials/tutorial-1.jpg',
    tools: [
      'Drum bekas 200 liter (untuk karbonisasi)',
      'Alat pencetak briket manual (tuas)',
      'Ember plastik besar',
      'Ayakan kawat mesh 40',
      'Timbangan duduk 20 kg',
      'Sarung tangan tebal',
      'Masker pelindung debu',
      'Sekop kecil',
      'Terpal penjemuran',
      'Plastik pembungkus',
    ],
    materials: [
      {
        name: 'Ampas sereh wangi kering',
        quantity: 10,
        unit: 'kg',
        estimatedCost: 0,
      },
      {
        name: 'Tepung tapioka (perekat)',
        quantity: 1,
        unit: 'kg',
        estimatedCost: 12000,
      },
      {
        name: 'Air bersih',
        quantity: 5,
        unit: 'liter',
        estimatedCost: 0,
      },
      {
        name: 'Minyak tanah (pemantik karbonisasi)',
        quantity: 0.5,
        unit: 'liter',
        estimatedCost: 8000,
      },
      {
        name: 'Plastik kemasan',
        quantity: 20,
        unit: 'lembar',
        estimatedCost: 15000,
      },
      {
        name: 'Label stiker',
        quantity: 20,
        unit: 'lembar',
        estimatedCost: 10000,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pengeringan Ampas',
        description:
          'Jemur ampas sereh wangi sisa destilasi di bawah sinar matahari selama 2-3 hari hingga kadar air turun di bawah 15%. Ampas harus benar-benar kering agar proses karbonisasi berjalan sempurna. Sebarkan ampas secara merata di atas terpal dengan ketebalan tidak lebih dari 5 cm. Balik ampas setiap 4-5 jam untuk pengeringan yang merata.',
        tips: 'Gunakan alat ukur kadar air (moisture meter) jika tersedia. Ampas yang sudah cukup kering akan terasa rapuh saat diremas dan berbunyi "kresek" saat ditekan.',
      },
      {
        stepNumber: 2,
        title: 'Karbonisasi (Pengarangan)',
        description:
          'Masukkan ampas kering ke dalam drum karbonisasi. Nyalakan api dari bagian bawah drum menggunakan sedikit minyak tanah. Tutup drum dengan rapat, sisakan lubang ventilasi kecil di bagian atas. Proses karbonisasi berlangsung selama 2-3 jam hingga asap yang keluar berubah dari putih menjadi biru tipis. Pastikan api tidak menyala terlalu besar agar ampas menjadi arang, bukan abu.',
        tips: 'Warna asap adalah indikator utama. Asap putih tebal berarti masih dalam tahap penguapan air. Asap kebiruan tipis menandakan karbonisasi hampir selesai. Segera tutup rapat semua lubang ventilasi saat asap sudah biru.',
      },
      {
        stepNumber: 3,
        title: 'Pendinginan Arang',
        description:
          'Setelah proses karbonisasi selesai, biarkan drum tertutup rapat selama minimal 8 jam atau semalaman. JANGAN membuka drum saat masih panas karena arang bisa terbakar habis saat terkena udara luar. Periksa suhu drum dengan menyentuh bagian luar — buka hanya jika drum sudah terasa dingin sepenuhnya.',
        tips: 'Membuka drum terlalu cepat adalah kesalahan paling umum yang menyebabkan arang berubah menjadi abu. Bersabarlah dan tunggu hingga benar-benar dingin.',
      },
      {
        stepNumber: 4,
        title: 'Penghalusan Arang',
        description:
          'Keluarkan arang dari drum dan hancurkan menjadi butiran halus menggunakan alu atau palu. Kemudian ayak menggunakan ayakan mesh 40 untuk mendapatkan serbuk arang yang seragam. Butiran yang terlalu besar dihaluskan kembali. Ukuran partikel yang seragam akan menghasilkan briket yang lebih padat dan kuat.',
        tips: 'Gunakan masker saat proses penghalusan karena debu arang sangat halus. Lakukan di area terbuka yang berventilasi baik. Simpan serbuk arang di wadah tertutup agar tidak terkena air.',
      },
      {
        stepNumber: 5,
        title: 'Pembuatan Larutan Perekat',
        description:
          'Larutkan 1 kg tepung tapioka dalam 3 liter air. Masak dengan api kecil sambil terus diaduk hingga membentuk adonan lem yang kental dan bening (seperti lem kanji). Pastikan tidak ada gumpalan. Biarkan larutan perekat mendingin hingga suhu ruangan sebelum dicampur dengan serbuk arang.',
        tips: 'Perbandingan ideal perekat adalah 10% dari berat total serbuk arang. Terlalu banyak perekat akan membuat briket sulit menyala, terlalu sedikit membuat briket mudah hancur.',
      },
      {
        stepNumber: 6,
        title: 'Pencampuran Adonan',
        description:
          'Campurkan serbuk arang dengan larutan perekat tapioka secara bertahap. Aduk hingga merata menggunakan tangan (gunakan sarung tangan) atau sekop. Adonan yang baik memiliki konsistensi seperti pasir basah — bisa dikepal dan tidak mudah hancur, namun juga tidak terlalu lembek atau lengket.',
        tips: 'Tambahkan perekat sedikit demi sedikit. Uji adonan dengan menggenggamnya — jika bisa membentuk gumpalan tanpa air menetes, konsistensinya sudah tepat.',
      },
      {
        stepNumber: 7,
        title: 'Pencetakan Briket',
        description:
          'Masukkan adonan ke dalam alat pencetak briket manual. Tekan tuas dengan kuat dan merata untuk menghasilkan briket yang padat. Keluarkan briket dengan hati-hati dan letakkan di atas alas yang rata. Satu batch biasanya menghasilkan 40-50 briket berukuran silinder diameter 5 cm.',
        tips: 'Tekan tuas hingga mentok untuk mendapatkan kepadatan maksimal. Briket yang kurang padat akan mudah retak saat pengeringan dan rapuh saat digunakan.',
      },
      {
        stepNumber: 8,
        title: 'Pengeringan Briket',
        description:
          'Jemur briket yang sudah dicetak di bawah sinar matahari selama 2-3 hari. Letakkan briket di atas rak kawat atau papan berlubang agar sirkulasi udara merata di semua sisi. Hindari pengeringan terlalu cepat yang bisa menyebabkan retak permukaan. Briket siap pakai jika terasa ringan dan berbunyi nyaring saat diketuk.',
        tips: 'Jangan menjemur langsung di atas tanah karena bagian bawah briket tidak akan kering merata. Pada musim hujan, gunakan oven pengering sederhana dengan suhu 60-80°C.',
      },
      {
        stepNumber: 9,
        title: 'Pengemasan dan Pelabelan',
        description:
          'Kemas briket yang sudah kering dalam plastik bening, masing-masing berisi 5-10 buah. Segel dengan rapi dan tempelkan label yang mencantumkan nama produk, berat bersih, petunjuk penggunaan, dan tanggal produksi. Simpan di tempat kering dan terhindar dari kelembapan.',
        tips: 'Pengemasan yang menarik meningkatkan nilai jual. Tambahkan informasi "ramah lingkungan" dan "dari limbah sereh wangi" sebagai nilai tambah pemasaran.',
      },
    ],
    totalEstimatedCost: 45000,
    estimatedRevenue: 120000,
    profitMargin: '62%',
    profitSimulation: {
      batchSize: '10 kg ampas → ~40 briket',
      costPerBatch: 45000,
      revenuePerBatch: 120000,
      profitPerBatch: 75000,
      monthlyBatches: 12,
      monthlyProfit: 900000,
    },
    risks: [
      {
        risk: 'Arang berubah menjadi abu saat karbonisasi karena suplai oksigen berlebih',
        mitigation:
          'Pastikan drum tertutup rapat dengan hanya menyisakan satu lubang ventilasi kecil (diameter 2-3 cm). Tutup lubang segera saat asap berubah biru.',
      },
      {
        risk: 'Briket retak atau hancur setelah pengeringan',
        mitigation:
          'Periksa rasio perekat (minimal 10% dari berat serbuk arang) dan pastikan pencetakan dilakukan dengan tekanan yang cukup kuat dan merata.',
      },
      {
        risk: 'Briket sulit menyala atau menghasilkan asap berlebih',
        mitigation:
          'Pastikan kadar air briket di bawah 8% sebelum dikemas. Kurangi jumlah perekat jika briket sulit menyala — rasio perekat terlalu tinggi menghambat pembakaran.',
      },
      {
        risk: 'Kontaminasi residu minyak atsiri pada ampas yang belum dicuci',
        mitigation:
          'Bilas ampas dengan air bersih sebelum penjemuran untuk menghilangkan sisa minyak. Residu sitronelal pada ampas sereh wangi dapat menyebabkan bau menyengat saat pembakaran.',
      },
    ],
    technicalNotes:
      'Perhatian: Ampas sereh wangi mengandung residu sitronelal dan geraniol yang bersifat volatil. Pastikan ampas dijemur minimal 2 hari di area terbuka sebelum karbonisasi untuk menguapkan sisa senyawa volatil ini. Karbonisasi ampas yang masih mengandung minyak atsiri dapat menghasilkan gas yang mudah terbakar. Nilai kalor briket ampas sereh wangi berkisar 4.500-5.200 kkal/kg, setara dengan briket batok kelapa kualitas standar. Kadar abu ideal di bawah 8%. Untuk meningkatkan nilai kalor, campurkan 20-30% serbuk batok kelapa pada adonan.',
  },
  {
    id: 2,
    title: 'Pembuatan Kompos Organik dari Ampas Nilam',
    slug: 'pembuatan-kompos-organik-ampas-nilam',
    description:
      'Panduan lengkap mengolah ampas nilam (Pogostemon cablin) sisa destilasi menjadi kompos organik berkualitas tinggi. Ampas nilam mengandung nitrogen, fosfor, dan kalium yang sangat baik untuk kesuburan tanah. Kompos ini ideal untuk tanaman hortikultura, sayuran, dan tanaman hias karena strukturnya yang gembur dan kaya unsur hara.',
    difficulty: 'Mudah',
    duration: '2-3 Jam (aktif) + 30-45 Hari (fermentasi)',
    category: 'Pupuk Organik',
    image: '/tutorials/tutorial-2.jpg',
    tools: [
      'Cangkul atau sekop',
      'Terpal plastik hitam (2×3 meter)',
      'Ember plastik 20 liter',
      'Gembor penyiram',
      'Termometer kompos (opsional)',
      'Karung goni atau plastik',
      'Sarung tangan karet',
      'Timbangan duduk',
      'Ayakan kawat mesh 10',
      'Plastik kemasan 5 kg',
    ],
    materials: [
      {
        name: 'Ampas nilam sisa destilasi',
        quantity: 50,
        unit: 'kg',
        estimatedCost: 0,
      },
      {
        name: 'Kotoran sapi/kambing',
        quantity: 15,
        unit: 'kg',
        estimatedCost: 15000,
      },
      {
        name: 'Dedak padi (bekatul)',
        quantity: 5,
        unit: 'kg',
        estimatedCost: 10000,
      },
      {
        name: 'EM4 (Effective Microorganisms)',
        quantity: 100,
        unit: 'ml',
        estimatedCost: 15000,
      },
      {
        name: 'Gula merah / tetes tebu (molase)',
        quantity: 200,
        unit: 'gram',
        estimatedCost: 5000,
      },
      {
        name: 'Air bersih',
        quantity: 20,
        unit: 'liter',
        estimatedCost: 0,
      },
      {
        name: 'Dolomit / kapur pertanian',
        quantity: 1,
        unit: 'kg',
        estimatedCost: 5000,
      },
      {
        name: 'Plastik kemasan',
        quantity: 10,
        unit: 'lembar',
        estimatedCost: 10000,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Persiapan dan Pencacahan Ampas',
        description:
          'Cacah ampas nilam sisa destilasi menjadi potongan kecil berukuran 2-5 cm menggunakan parang atau mesin pencacah. Ampas yang lebih kecil akan terdekomposisi lebih cepat karena luas permukaan yang lebih besar memudahkan kerja mikroorganisme pengurai. Jika ampas masih basah setelah destilasi, angin-anginkan selama 1 hari.',
        tips: 'Ampas nilam yang keluar dari ketel destilasi biasanya sudah cukup lunak sehingga mudah dicacah. Jangan mengeringkan ampas sampai terlalu kering karena kelembapan awal justru membantu proses dekomposisi.',
      },
      {
        stepNumber: 2,
        title: 'Aktivasi Larutan EM4',
        description:
          'Larutkan 200 gram gula merah dalam 5 liter air hangat (suhu 30-40°C). Setelah gula larut sempurna, tambahkan 100 ml EM4 dan aduk merata. Diamkan larutan selama 24 jam dalam wadah tertutup (tidak rapat, sisakan celah) di tempat teduh. Larutan siap pakai jika berbau asam manis seperti tape.',
        tips: 'Jangan gunakan air yang mengandung klorin (air PAM) karena akan membunuh bakteri EM4. Gunakan air sumur atau air hujan. Larutan EM4 yang sudah diaktivasi harus digunakan dalam waktu 3 hari.',
      },
      {
        stepNumber: 3,
        title: 'Penyusunan Lapisan Kompos',
        description:
          'Siapkan area pengomposan di tempat teduh dan rata. Susun bahan secara berlapis: lapisan pertama ampas nilam setebal 15-20 cm, kemudian taburi kotoran sapi 3-5 cm, lalu taburkan dedak padi tipis dan dolomit. Ulangi susunan lapisan hingga seluruh bahan habis. Siram setiap lapisan dengan larutan EM4 yang sudah diaktivasi secara merata.',
        tips: 'Rasio ideal adalah C/N (karbon/nitrogen) sekitar 25-30:1. Ampas nilam kaya karbon, sedangkan kotoran ternak menyediakan nitrogen. Jangan memadatkan lapisan terlalu rapat agar oksigen tetap bisa masuk.',
      },
      {
        stepNumber: 4,
        title: 'Pengaturan Kelembapan',
        description:
          'Periksa kelembapan tumpukan kompos. Caranya, ambil segenggam bahan dari bagian tengah tumpukan dan remas kuat. Jika air menetes 1-2 tetes, kelembapannya sudah ideal (50-60%). Jika terlalu kering, siram tambahan air. Jika terlalu basah, tambahkan dedak padi atau ampas nilam kering.',
        tips: 'Kelembapan yang terlalu rendah memperlambat dekomposisi, sedangkan terlalu tinggi menyebabkan kondisi anaerobik (busuk) yang menghasilkan bau tidak sedap dan gas metana.',
      },
      {
        stepNumber: 5,
        title: 'Penutupan Tumpukan',
        description:
          'Tutup tumpukan kompos dengan terpal plastik hitam. Terpal hitam menyerap panas matahari sehingga mempercepat proses fermentasi. Beri pemberat di setiap sisi terpal agar tidak tertiup angin. Pastikan terpal tidak menyentuh tanah di sisi-sisinya — sisakan celah 10 cm untuk sirkulasi udara minimal.',
        tips: 'Suhu ideal pengomposan adalah 40-65°C. Jika memiliki termometer kompos, pantau suhu setiap 3 hari. Suhu di atas 70°C terlalu panas dan bisa membunuh mikroorganisme pengurai — buka terpal untuk menurunkan suhu.',
      },
      {
        stepNumber: 6,
        title: 'Pembalikan Rutin',
        description:
          'Lakukan pembalikan tumpukan kompos setiap 7 hari sekali selama 4-6 minggu. Gunakan cangkul atau garpu untuk membalik bagian dalam ke luar dan sebaliknya. Pembalikan berfungsi untuk menyuplai oksigen segar, meratakan suhu, dan mencampur bahan yang sudah terdekomposisi dengan yang belum. Periksa kelembapan setiap kali membalik.',
        tips: 'Pembalikan yang teratur adalah kunci keberhasilan pengomposan. Jika tumpukan berbau busuk (amonia), berarti kekurangan oksigen — segera balik dan tambahkan bahan kaya karbon seperti dedak atau serbuk gergaji.',
      },
      {
        stepNumber: 7,
        title: 'Pemantauan Kematangan',
        description:
          'Kompos matang ditandai dengan: warna cokelat kehitaman seragam, tekstur remah dan gembur, suhu kembali ke suhu ruangan (tidak panas lagi), bau seperti tanah hutan yang segar, dan volume menyusut 40-50% dari awal. Proses ini biasanya memakan waktu 30-45 hari. Untuk uji kematangan, ambil sedikit kompos dan taruh di pot kecil, tanam biji kecambah — jika tumbuh normal dalam 5 hari, kompos sudah matang.',
        tips: 'Kompos yang belum matang bisa merusak akar tanaman karena masih menghasilkan panas dan senyawa fitotoksik. Jangan terburu-buru menggunakan kompos yang belum sepenuhnya matang.',
      },
      {
        stepNumber: 8,
        title: 'Pengayakan dan Pengemasan',
        description:
          'Ayak kompos matang menggunakan ayakan kawat mesh 10 untuk memisahkan material kasar yang belum terdekomposisi sempurna. Material kasar bisa dicampurkan kembali ke batch pengomposan berikutnya. Kemas kompos halus dalam plastik atau karung berukuran 5 kg atau 10 kg. Beri label yang mencantumkan kandungan unsur hara, tanggal produksi, dan cara penggunaan.',
        tips: 'Kompos yang sudah dikemas harus disimpan di tempat teduh dan kering. Hindari terkena hujan langsung karena kelembapan berlebih bisa memicu pertumbuhan jamur yang tidak diinginkan.',
      },
    ],
    totalEstimatedCost: 60000,
    estimatedRevenue: 200000,
    profitMargin: '70%',
    profitSimulation: {
      batchSize: '50 kg ampas → ~30 kg kompos',
      costPerBatch: 60000,
      revenuePerBatch: 200000,
      profitPerBatch: 140000,
      monthlyBatches: 2,
      monthlyProfit: 280000,
    },
    risks: [
      {
        risk: 'Kompos berbau busuk (amonia) akibat kondisi anaerobik',
        mitigation:
          'Lakukan pembalikan lebih sering (setiap 4-5 hari) dan pastikan tumpukan tidak terlalu padat. Tambahkan bahan kaya karbon seperti dedak padi atau serbuk gergaji untuk memperbaiki rasio C/N.',
      },
      {
        risk: 'Residu minyak patchouli (patchouli alcohol) menghambat aktivitas mikroba pengurai',
        mitigation:
          'Angin-anginkan ampas nilam selama 1-2 hari sebelum pengomposan untuk menguapkan sisa minyak atsiri. Konsentrasi patchouli alcohol di atas 0,5% bersifat antimikroba.',
      },
      {
        risk: 'Hama lalat dan belatung berkembang biak di tumpukan kompos',
        mitigation:
          'Tutup tumpukan dengan rapat dan pastikan tidak ada sisa makanan di sekitar area pengomposan. Taburi permukaan dengan kapur pertanian tipis untuk mengusir lalat.',
      },
      {
        risk: 'Kompos tidak matang merata karena ukuran partikel ampas terlalu besar',
        mitigation:
          'Cacah ampas nilam hingga ukuran 2-5 cm sebelum pengomposan. Partikel yang lebih kecil mempercepat dekomposisi secara signifikan.',
      },
    ],
    technicalNotes:
      'Perhatian: Ampas nilam mengandung senyawa patchouli alcohol (C₁₅H₂₆O) yang bersifat antimikroba pada konsentrasi tinggi. Ampas HARUS diangin-anginkan minimal 24 jam sebelum pengomposan untuk menguapkan sisa minyak atsiri agar tidak menghambat aktivitas mikroorganisme pengurai. pH awal ampas nilam biasanya asam (4,5-5,5) sehingga penambahan dolomit/kapur pertanian penting untuk menaikkan pH ke kisaran optimal 6,5-7,5. Kandungan hara kompos ampas nilam: N 1,8-2,3%, P₂O₅ 0,6-0,9%, K₂O 1,5-2,1%. Kompos ini sangat cocok untuk memperbaiki struktur tanah liat dan meningkatkan kapasitas tukar kation (KTK) tanah.',
  },
  {
    id: 3,
    title: 'Pembuatan Disinfektan Alami dari Limbah Cair Cengkeh',
    slug: 'pembuatan-disinfektan-alami-limbah-cair-cengkeh',
    description:
      'Manfaatkan limbah cair (hydrosol) dari destilasi bunga cengkeh untuk membuat disinfektan alami yang efektif membunuh bakteri dan jamur. Limbah cair cengkeh mengandung eugenol dalam kadar rendah yang memiliki sifat antiseptik kuat. Produk ini aman digunakan untuk membersihkan lantai, kamar mandi, dan permukaan dapur.',
    difficulty: 'Mudah',
    duration: '2-3 Jam',
    category: 'Pembersih & Disinfektan',
    image: '/tutorials/tutorial-3.jpg',
    tools: [
      'Panci stainless steel 10 liter',
      'Kompor gas atau tungku',
      'Saringan kain kasa',
      'Corong plastik',
      'Gelas ukur 1 liter',
      'Pengaduk kayu panjang',
      'Botol semprot 500 ml',
      'Label stiker',
      'Sarung tangan karet',
      'Kacamata pelindung',
    ],
    materials: [
      {
        name: 'Limbah cair destilasi cengkeh (hydrosol)',
        quantity: 5,
        unit: 'liter',
        estimatedCost: 0,
      },
      {
        name: 'Cuka putih (asam asetat 5%)',
        quantity: 500,
        unit: 'ml',
        estimatedCost: 8000,
      },
      {
        name: 'Baking soda (natrium bikarbonat)',
        quantity: 100,
        unit: 'gram',
        estimatedCost: 5000,
      },
      {
        name: 'Alkohol 70%',
        quantity: 500,
        unit: 'ml',
        estimatedCost: 18000,
      },
      {
        name: 'Minyak cengkeh murni (opsional, penguat)',
        quantity: 10,
        unit: 'ml',
        estimatedCost: 15000,
      },
      {
        name: 'Botol semprot bekas bersih',
        quantity: 10,
        unit: 'buah',
        estimatedCost: 20000,
      },
      {
        name: 'Label produk',
        quantity: 10,
        unit: 'lembar',
        estimatedCost: 8000,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Penyaringan Limbah Cair',
        description:
          'Saring limbah cair destilasi cengkeh menggunakan kain kasa berlapis 3 untuk menghilangkan partikel padat, serpihan bunga, dan kotoran. Ulangi penyaringan 2-3 kali hingga cairan jernih. Limbah cair yang keruh mengandung partikel yang bisa menyumbat nosel botol semprot dan mengurangi daya simpan produk.',
        tips: 'Gunakan limbah cair yang masih segar (maksimal 3 hari setelah destilasi). Limbah cair yang sudah terlalu lama disimpan bisa ditumbuhi mikroba dan berbau tidak sedap.',
      },
      {
        stepNumber: 2,
        title: 'Pemanasan dan Konsentrasi',
        description:
          'Tuang limbah cair yang sudah disaring ke panci stainless steel. Panaskan dengan api kecil hingga suhu 60-70°C selama 20 menit. Tujuannya untuk mengurangi volume cairan (mengonsentrasikan eugenol) dan membunuh mikroba kontaminan. JANGAN mendidihkan karena suhu tinggi akan menguapkan senyawa aktif eugenol.',
        tips: 'Gunakan termometer memasak untuk memantau suhu. Jika tidak tersedia, pegang tangan 15 cm di atas permukaan cairan — jika terasa sangat panas tapi belum ada gelembung, suhunya sudah tepat.',
      },
      {
        stepNumber: 3,
        title: 'Penambahan Cuka Putih',
        description:
          'Setelah cairan agak dingin (suhu 40°C), tambahkan 500 ml cuka putih sambil diaduk perlahan. Asam asetat dalam cuka berfungsi sebagai pengawet alami, menurunkan pH ke kisaran 3-4 yang menghambat pertumbuhan bakteri, dan meningkatkan efektivitas disinfektan. Aduk selama 3-5 menit hingga tercampur rata.',
        tips: 'Pastikan ruangan berventilasi baik saat menambahkan cuka. Jangan terlalu banyak cuka karena pH yang terlalu rendah bisa merusak permukaan marmer dan logam tertentu.',
      },
      {
        stepNumber: 4,
        title: 'Penambahan Alkohol',
        description:
          'Tambahkan 500 ml alkohol 70% ke dalam campuran sambil mengaduk. Alkohol berfungsi sebagai pelarut tambahan untuk meningkatkan kelarutan eugenol dalam air, mempercepat penguapan saat diaplikasikan, dan menambah daya antiseptik. Jika ingin produk lebih kuat, tambahkan 10 ml minyak cengkeh murni dan aduk hingga homogen.',
        tips: 'JANGAN menambahkan alkohol di dekat api atau sumber panas. Alkohol sangat mudah terbakar. Matikan kompor sebelum menuangkan alkohol.',
      },
      {
        stepNumber: 5,
        title: 'Pengujian pH dan Penyesuaian',
        description:
          'Uji pH larutan menggunakan kertas lakmus atau pH meter digital. pH ideal untuk disinfektan ini adalah 3,5-4,5. Jika pH terlalu rendah (terlalu asam), tambahkan sedikit baking soda sambil diaduk — tambahkan sedikit demi sedikit karena akan bereaksi menghasilkan buih. Jika pH terlalu tinggi, tambahkan cuka putih.',
        tips: 'Kertas lakmus bisa dibeli murah di apotek atau toko kimia. Setiap penambahan baking soda 10 gram biasanya menaikkan pH sekitar 0,3-0,5 poin.',
      },
      {
        stepNumber: 6,
        title: 'Pendiaman dan Pengendapan',
        description:
          'Diamkan campuran selama 2-4 jam dalam wadah tertutup di tempat gelap. Selama pendiaman, partikel-partikel halus yang tersisa akan mengendap ke dasar. Setelah itu, ambil cairan jernih dari bagian atas secara hati-hati menggunakan selang atau dituang perlahan, sisakan endapan di dasar.',
        tips: 'Proses ini penting untuk menghasilkan disinfektan yang jernih dan bebas partikel. Partikel tersisa bisa menyumbat nosel semprot.',
      },
      {
        stepNumber: 7,
        title: 'Pengisian dan Pengemasan',
        description:
          'Tuang disinfektan ke dalam botol semprot bersih menggunakan corong. Isi botol hingga 90% kapasitas, sisakan ruang untuk tekanan semprot. Pasang kepala semprot dan uji semprotan beberapa kali untuk memastikan berfungsi dengan baik. Tempelkan label yang mencantumkan nama produk, komposisi, cara penggunaan, peringatan, dan tanggal produksi.',
        tips: 'Gunakan botol berwarna gelap (cokelat/hijau) jika tersedia, karena sinar UV bisa mendegradasi senyawa aktif eugenol. Jika hanya tersedia botol bening, simpan di tempat yang tidak terkena sinar matahari langsung.',
      },
      {
        stepNumber: 8,
        title: 'Uji Efektivitas Sederhana',
        description:
          'Lakukan uji sederhana dengan menyemprotkan disinfektan pada permukaan yang kotor (meja, lantai, wastafel). Diamkan 5-10 menit, lalu lap bersih. Permukaan harus terasa bersih, sedikit berbau cengkeh segar, dan tidak meninggalkan residu lengket. Minta beberapa orang mencoba dan memberikan masukan sebelum menjual.',
        tips: 'Lakukan uji pada berbagai permukaan (keramik, kayu, plastik, stainless steel) untuk memastikan tidak menyebabkan perubahan warna atau kerusakan. Hindari penggunaan pada marmer dan granit karena asam dapat merusak permukaannya.',
      },
    ],
    totalEstimatedCost: 74000,
    estimatedRevenue: 200000,
    profitMargin: '63%',
    profitSimulation: {
      batchSize: '5 liter hydrosol → ~10 botol @500ml',
      costPerBatch: 74000,
      revenuePerBatch: 200000,
      profitPerBatch: 126000,
      monthlyBatches: 8,
      monthlyProfit: 1008000,
    },
    risks: [
      {
        risk: 'Iritasi kulit jika konsentrasi eugenol terlalu tinggi',
        mitigation:
          'Batasi penambahan minyak cengkeh murni maksimal 2% dari total volume. Selalu cantumkan peringatan "Hindari kontak langsung dengan kulit sensitif" pada label produk.',
      },
      {
        risk: 'Produk cepat basi atau ditumbuhi jamur',
        mitigation:
          'Pastikan pH di bawah 4,5 dan kandungan alkohol minimal 10% dari total volume. Kedua faktor ini berfungsi sebagai pengawet alami. Masa simpan idealnya 3 bulan pada suhu ruangan.',
      },
      {
        risk: 'Reaksi berbahaya saat mencampur alkohol di dekat sumber api',
        mitigation:
          'SELALU matikan kompor dan jauhkan sumber api sebelum menambahkan alkohol. Bekerja di area berventilasi baik. Siapkan alat pemadam kebakaran atau karung basah.',
      },
      {
        risk: 'Kerusakan permukaan marmer atau logam tertentu oleh asam',
        mitigation:
          'Beri peringatan jelas pada label produk untuk tidak digunakan pada permukaan batu alam (marmer, granit) dan logam yang mudah berkarat.',
      },
    ],
    technicalNotes:
      'Perhatian: Limbah cair (hydrosol) destilasi cengkeh mengandung eugenol terlarut (0,1-0,5%) dan asam organik. Eugenol (C₁₀H₁₂O₂) memiliki sifat antiseptik, antifungal, dan antibakteri yang terbukti secara ilmiah. Namun, eugenol dalam konsentrasi tinggi (>5%) bersifat iritan dan dapat menyebabkan dermatitis kontak. Pastikan konsentrasi eugenol dalam produk akhir tidak melebihi 2% untuk keamanan penggunaan rumah tangga. pH produk akhir harus berada di kisaran 3,5-4,5 untuk efektivitas maksimal. Produk ini TIDAK untuk dikonsumsi atau digunakan pada luka terbuka. Simpan jauh dari jangkauan anak-anak.',
  },
  {
    id: 4,
    title: 'Pembuatan Biopestisida dari Limbah Sereh',
    slug: 'pembuatan-biopestisida-limbah-sereh',
    description:
      'Panduan membuat biopestisida alami dari limbah daun dan batang sereh (Cymbopogon citratus) sisa destilasi untuk mengendalikan hama tanaman secara organik. Kandungan sitral dan sitronelal pada limbah sereh efektif mengusir hama seperti kutu daun, wereng, dan ulat, sekaligus aman bagi lingkungan dan serangga penyerbuk.',
    difficulty: 'Mudah',
    duration: '2-3 Jam (aktif) + 3-5 Hari (fermentasi)',
    category: 'Biopestisida',
    image: '/tutorials/tutorial-4.jpg',
    tools: [
      'Ember plastik 30 liter dengan tutup',
      'Saringan kain halus',
      'Blender atau mesin giling',
      'Botol semprot 1 liter (sprayer)',
      'Gelas ukur 1 liter',
      'Pengaduk kayu',
      'Pisau atau parang',
      'Timbangan',
      'Corong plastik',
      'Jerigen 5 liter',
    ],
    materials: [
      {
        name: 'Limbah daun & batang sereh sisa destilasi',
        quantity: 5,
        unit: 'kg',
        estimatedCost: 0,
      },
      {
        name: 'Bawang putih',
        quantity: 200,
        unit: 'gram',
        estimatedCost: 8000,
      },
      {
        name: 'Cabai rawit merah',
        quantity: 100,
        unit: 'gram',
        estimatedCost: 5000,
      },
      {
        name: 'Sabun colek / sabun cuci piring cair',
        quantity: 50,
        unit: 'ml',
        estimatedCost: 3000,
      },
      {
        name: 'Air bersih',
        quantity: 20,
        unit: 'liter',
        estimatedCost: 0,
      },
      {
        name: 'EM4 (opsional, untuk fermentasi)',
        quantity: 50,
        unit: 'ml',
        estimatedCost: 8000,
      },
      {
        name: 'Botol/jerigen kemasan',
        quantity: 5,
        unit: 'buah',
        estimatedCost: 25000,
      },
      {
        name: 'Label produk',
        quantity: 20,
        unit: 'lembar',
        estimatedCost: 8000,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Pencacahan Limbah Sereh',
        description:
          'Potong limbah daun dan batang sereh menjadi potongan kecil sepanjang 3-5 cm. Semakin kecil potongan, semakin mudah senyawa aktif terekstraksi. Pisahkan bagian yang sudah busuk atau berjamur karena bisa mengontaminasi biopestisida. Gunakan limbah yang masih segar atau baru diangin-anginkan 1 hari setelah destilasi.',
        tips: 'Limbah sereh sisa destilasi masih mengandung sekitar 10-20% senyawa aktif yang tidak terekstraksi selama proses penyulingan. Senyawa inilah yang akan kita manfaatkan.',
      },
      {
        stepNumber: 2,
        title: 'Pembuatan Ekstrak Bawang Putih-Cabai',
        description:
          'Kupas 200 gram bawang putih dan haluskan bersama 100 gram cabai rawit menggunakan blender dengan sedikit air (200 ml). Hasilnya berupa pasta halus yang kaya capsaicin (dari cabai) dan allicin (dari bawang putih) — keduanya bersifat repelen alami. Sisihkan pasta ini untuk dicampurkan nanti.',
        tips: 'Gunakan sarung tangan saat mengolah cabai untuk menghindari iritasi kulit. Hindari menyentuh mata setelah menangani cabai. Blender dalam ruangan berventilasi baik karena uap cabai cukup menyengat.',
      },
      {
        stepNumber: 3,
        title: 'Perendaman dan Fermentasi',
        description:
          'Masukkan potongan limbah sereh ke dalam ember 30 liter. Tambahkan pasta bawang putih-cabai dan 15 liter air bersih. Aduk merata. Tambahkan 50 ml EM4 (opsional, untuk mempercepat fermentasi dan ekstraksi senyawa aktif). Tutup ember dengan rapat namun tidak kedap udara — sisakan celah kecil untuk keluarnya gas fermentasi.',
        tips: 'Letakkan ember di tempat teduh, hindari sinar matahari langsung. Suhu ideal fermentasi adalah 25-35°C. Aduk campuran sekali sehari untuk meratakan proses.',
      },
      {
        stepNumber: 4,
        title: 'Pemantauan Fermentasi (3-5 Hari)',
        description:
          'Biarkan campuran berfermentasi selama 3-5 hari. Setiap hari, buka tutup dan aduk selama 2-3 menit. Campuran yang baik akan berbau khas sereh bercampur asam fermentasi. Pada hari ke-3, cairan mulai berubah warna menjadi kecokelatan. Proses fermentasi selesai saat cairan berbau kuat dan berwarna cokelat gelap.',
        tips: 'Jika muncul bau busuk yang sangat menyengat (seperti telur busuk), berarti terjadi fermentasi anaerobik yang tidak diinginkan. Buka tutup, aduk intensif, dan biarkan terbuka beberapa jam untuk suplai oksigen.',
      },
      {
        stepNumber: 5,
        title: 'Penyaringan',
        description:
          'Saring campuran menggunakan kain halus berlapis 2-3. Peras ampas kuat-kuat untuk mengekstraksi seluruh cairan aktif. Ulangi penyaringan jika masih ada partikel kasar yang lolos. Cairan hasil saringan inilah yang menjadi konsentrat biopestisida. Ampas sisa saringan bisa digunakan sebagai mulsa organik di kebun.',
        tips: 'Gunakan sarung tangan tebal saat memeras ampas karena capsaicin dari cabai masih aktif dan bisa menyebabkan sensasi terbakar pada kulit.',
      },
      {
        stepNumber: 6,
        title: 'Pencampuran Akhir dan Penambahan Perekat',
        description:
          'Tambahkan 50 ml sabun colek cair yang sudah dilarutkan ke dalam konsentrat biopestisida. Sabun berfungsi sebagai surfaktan (perekat) agar larutan menempel lebih baik pada permukaan daun dan tidak langsung mengalir jatuh saat disemprotkan. Aduk perlahan hingga tercampur rata tanpa membuat busa berlebihan.',
        tips: 'Jangan menggunakan sabun terlalu banyak karena bisa menyumbat stomata daun dan menghambat fotosintesis. Rasio ideal adalah 1 ml sabun per liter larutan siap semprot.',
      },
      {
        stepNumber: 7,
        title: 'Pengenceran dan Pengujian',
        description:
          'Konsentrat biopestisida HARUS diencerkan sebelum digunakan. Rasio pengenceran standar: 1 bagian konsentrat dicampur 5 bagian air bersih. Untuk hama berat, gunakan rasio 1:3. Uji coba pada beberapa daun terlebih dahulu dan tunggu 24 jam — jika daun tidak layu atau berubah warna, konsentrasi sudah aman.',
        tips: 'Semprotkan pada sore hari (setelah pukul 16.00) untuk menghindari penguapan cepat oleh sinar matahari dan mencegah daun terbakar (sunburn) akibat efek lensa dari tetesan air.',
      },
      {
        stepNumber: 8,
        title: 'Pengemasan dan Penyimpanan',
        description:
          'Tuang konsentrat biopestisida ke dalam jerigen atau botol bersih. Beri label lengkap: nama produk, komposisi, rasio pengenceran, cara aplikasi, tanggal produksi, dan peringatan keamanan. Simpan konsentrat di tempat sejuk, gelap, dan kering. Masa simpan konsentrat adalah 1-2 bulan jika disimpan dengan benar.',
        tips: 'Kocok konsentrat sebelum setiap penggunaan karena bahan aktif bisa mengendap. Tutup rapat setelah penggunaan untuk mencegah kontaminasi dan penguapan.',
      },
    ],
    totalEstimatedCost: 57000,
    estimatedRevenue: 175000,
    profitMargin: '67%',
    profitSimulation: {
      batchSize: '5 kg limbah sereh → ~15 liter konsentrat',
      costPerBatch: 57000,
      revenuePerBatch: 175000,
      profitPerBatch: 118000,
      monthlyBatches: 6,
      monthlyProfit: 708000,
    },
    risks: [
      {
        risk: 'Konsentrasi terlalu pekat menyebabkan kerusakan daun (fitotoksisitas)',
        mitigation:
          'Selalu lakukan uji coba pada beberapa daun sebelum aplikasi massal. Gunakan rasio pengenceran minimal 1:5 untuk awal. Tingkatkan konsentrasi secara bertahap jika diperlukan.',
      },
      {
        risk: 'Iritasi kulit dan mata akibat capsaicin dari cabai',
        mitigation:
          'Wajib gunakan sarung tangan, kacamata pelindung, dan masker saat membuat dan mengaplikasikan biopestisida. Cuci tangan dengan sabun setelah penanganan.',
      },
      {
        risk: 'Membunuh serangga berguna (predator alami dan penyerbuk)',
        mitigation:
          'Aplikasikan pada sore/malam hari saat lebah dan kupu-kupu tidak aktif. Hindari penyemprotan pada bunga yang sedang mekar. Targetkan penyemprotan hanya pada area yang terserang hama.',
      },
      {
        risk: 'Efektivitas menurun saat musim hujan karena larutan tercuci',
        mitigation:
          'Aplikasikan saat prakiraan cuaca cerah minimal 6 jam ke depan. Tambahkan surfaktan (sabun) untuk meningkatkan daya rekat. Ulangi penyemprotan setelah hujan deras.',
      },
    ],
    technicalNotes:
      'Perhatian: Limbah sereh sisa destilasi masih mengandung sitronelal (C₁₀H₁₈O) dan geraniol (C₁₀H₁₈O) dalam kadar rendah (0,3-0,8%) yang memiliki sifat repelen terhadap serangga. Senyawa capsaicin (C₁₈H₂₇NO₃) dari cabai rawit bersifat neurotoksik bagi serangga namun aman bagi tanaman dan mamalia dalam dosis rendah. Allicin (C₆H₁₀OS₂) dari bawang putih bersifat fungisida alami. Kombinasi ketiga senyawa ini menciptakan efek sinergis yang efektif terhadap berbagai jenis hama. Biopestisida ini TIDAK efektif untuk hama penggerek batang dan hama tanah — untuk jenis hama tersebut diperlukan metode pengendalian yang berbeda. Jangan gunakan pada tanaman yang akan dipanen dalam 3 hari ke depan.',
  },
  {
    id: 5,
    title: 'Pembuatan Sabun Cuci Piring dari Limbah Cair Nilam',
    slug: 'pembuatan-sabun-cuci-piring-limbah-cair-nilam',
    description:
      'Tutorial membuat sabun cuci piring cair alami menggunakan limbah cair (hydrosol) dari destilasi nilam yang dicampur dengan bahan-bahan lokal. Hydrosol nilam memberikan aroma khas yang menyenangkan sekaligus sifat antibakteri ringan pada sabun. Produk ini ramah lingkungan, biodegradable, dan aman untuk septic tank.',
    difficulty: 'Menengah',
    duration: '3-4 Jam',
    category: 'Sabun & Deterjen',
    image: '/tutorials/tutorial-5.jpg',
    tools: [
      'Panci stainless steel 10 liter',
      'Kompor gas',
      'Pengaduk kayu panjang',
      'Gelas ukur 1 liter',
      'Timbangan digital (ketelitian 1 gram)',
      'Saringan kain',
      'Botol kemasan 500 ml',
      'Corong plastik',
      'pH meter atau kertas lakmus',
      'Sarung tangan karet tebal',
      'Kacamata pelindung',
      'Masker',
    ],
    materials: [
      {
        name: 'Limbah cair destilasi nilam (hydrosol)',
        quantity: 3,
        unit: 'liter',
        estimatedCost: 0,
      },
      {
        name: 'Texapon (Sodium Lauryl Ether Sulfate/SLES)',
        quantity: 500,
        unit: 'gram',
        estimatedCost: 20000,
      },
      {
        name: 'Garam dapur (NaCl)',
        quantity: 200,
        unit: 'gram',
        estimatedCost: 3000,
      },
      {
        name: 'Asam sitrat (citric acid)',
        quantity: 50,
        unit: 'gram',
        estimatedCost: 5000,
      },
      {
        name: 'Pewarna makanan hijau (opsional)',
        quantity: 5,
        unit: 'ml',
        estimatedCost: 3000,
      },
      {
        name: 'CMC (Carboxy Methyl Cellulose) — pengental',
        quantity: 30,
        unit: 'gram',
        estimatedCost: 8000,
      },
      {
        name: 'Pengawet sodium benzoat',
        quantity: 10,
        unit: 'gram',
        estimatedCost: 5000,
      },
      {
        name: 'Botol kemasan 500 ml',
        quantity: 10,
        unit: 'buah',
        estimatedCost: 30000,
      },
      {
        name: 'Label produk',
        quantity: 10,
        unit: 'lembar',
        estimatedCost: 8000,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Penyaringan Hydrosol Nilam',
        description:
          'Saring limbah cair destilasi nilam menggunakan kain kasa berlapis 3-4 untuk membuang seluruh partikel padat, serpihan daun, dan kotoran. Hasil saringan harus jernih kekuningan dengan aroma khas nilam. Limbah cair yang masih mengandung partikel akan membuat sabun keruh dan berpasir.',
        tips: 'Hydrosol nilam yang bagus berwarna jernih hingga kuning pucat dan beraroma earthy khas nilam. Jika berbau tengik atau asam kuat, limbah cair sudah terlalu lama disimpan dan sebaiknya tidak digunakan.',
      },
      {
        stepNumber: 2,
        title: 'Pemanasan Hydrosol',
        description:
          'Tuang 3 liter hydrosol nilam yang sudah disaring ke dalam panci stainless steel. Panaskan dengan api kecil hingga suhu 50-60°C. Jangan sampai mendidih karena akan menguapkan senyawa aromatik yang memberikan wangi pada sabun. Pemanasan bertujuan untuk melarutkan bahan-bahan berikutnya dengan lebih mudah.',
        tips: 'Gunakan panci stainless steel, JANGAN aluminium. Hydrosol yang bersifat sedikit asam dapat bereaksi dengan aluminium dan mengontaminasi produk.',
      },
      {
        stepNumber: 3,
        title: 'Pelarutan CMC (Pengental)',
        description:
          'Ambil 500 ml hydrosol panas dari panci ke wadah terpisah. Taburkan 30 gram CMC sedikit demi sedikit sambil mengaduk cepat untuk mencegah penggumpalan. Aduk terus selama 10-15 menit hingga CMC larut sempurna membentuk gel bening. Diamkan 30 menit agar gel mengembang sempurna, lalu tuang kembali ke panci utama.',
        tips: 'CMC adalah pengental yang sangat mudah menggumpal. Kunci suksesnya adalah menaburkan SEDIKIT DEMI SEDIKIT sambil mengaduk CEPAT. Jika terlanjur menggumpal, saring dengan saringan kawat halus.',
      },
      {
        stepNumber: 4,
        title: 'Penambahan Texapon (SLES)',
        description:
          'Tuang 500 gram Texapon ke dalam panci secara perlahan sambil mengaduk dengan gerakan memutar satu arah. Texapon adalah bahan pembuat busa dan pembersih utama dalam sabun cuci piring. Aduk perlahan dan konsisten selama 15-20 menit. HINDARI mengaduk terlalu cepat karena akan menghasilkan busa berlebihan yang menyulitkan proses selanjutnya.',
        tips: 'Aduk searah jarum jam dengan kecepatan konstan. Mengaduk terlalu cepat atau bolak-balik membuat busa menumpuk dan sulit dikendalikan. Jika busa terlalu banyak, diamkan 10 menit sebelum melanjutkan.',
      },
      {
        stepNumber: 5,
        title: 'Penambahan Garam (Pengental Tambahan)',
        description:
          'Larutkan 200 gram garam dapur dalam 200 ml air hangat terlebih dahulu. Tuang larutan garam ke dalam campuran sabun SEDIKIT DEMI SEDIKIT sambil terus mengaduk. Garam berfungsi sebagai pengental tambahan untuk mencapai viskositas (kekentalan) sabun yang diinginkan. Perhatikan kekentalan setiap penambahan — berhenti jika sudah cukup kental.',
        tips: 'Penambahan garam harus bertahap karena titik optimal kekentalan bisa terlampaui — kelebihan garam justru membuat sabun menjadi encer kembali (fenomena "salt curve"). Biasanya 150-200 gram sudah cukup.',
      },
      {
        stepNumber: 6,
        title: 'Penyesuaian pH',
        description:
          'Uji pH campuran menggunakan kertas lakmus atau pH meter. pH ideal sabun cuci piring adalah 6,5-7,5 (mendekati netral). Jika pH terlalu tinggi (basa), tambahkan asam sitrat sedikit demi sedikit. Jika pH terlalu rendah (asam), tambahkan larutan soda ash encer. Aduk rata setelah setiap penambahan dan uji ulang pH.',
        tips: 'pH yang tepat penting untuk keamanan kulit tangan pengguna dan efektivitas pembersihan. pH di atas 8 akan membuat kulit kering dan pecah-pecah, sedangkan pH di bawah 5 tidak efektif membersihkan lemak.',
      },
      {
        stepNumber: 7,
        title: 'Pewarnaan dan Pengawetan',
        description:
          'Tambahkan 5 ml pewarna makanan hijau (atau warna lain sesuai selera) untuk tampilan yang menarik. Tambahkan juga 10 gram sodium benzoat yang sudah dilarutkan dalam sedikit air sebagai pengawet untuk mencegah pertumbuhan jamur dan bakteri selama penyimpanan. Aduk merata hingga warna homogen.',
        tips: 'Gunakan pewarna MAKANAN, bukan pewarna tekstil. Pewarna makanan aman jika terkena kulit. Sodium benzoat cukup efektif dalam konsentrasi 0,1-0,2% dari total volume.',
      },
      {
        stepNumber: 8,
        title: 'Pendiaman dan Penghilangan Busa',
        description:
          'Diamkan sabun selama 12-24 jam di wadah terbuka lebar. Selama pendiaman, gelembung udara dan busa yang terperangkap akan naik ke permukaan dan pecah, menghasilkan sabun yang jernih dan menarik. Setelah pendiaman, aduk perlahan sekali lagi dan siap dikemas.',
        tips: 'Langkah ini sering dilewati oleh pemula, padahal sabun yang masih mengandung banyak gelembung udara akan terlihat keruh dan kurang menarik. Bersabarlah menunggu 24 jam.',
      },
      {
        stepNumber: 9,
        title: 'Pengemasan dan Pelabelan',
        description:
          'Tuang sabun ke dalam botol kemasan 500 ml menggunakan corong. Pastikan botol sudah bersih dan kering. Pasang tutup botol dengan rapat. Tempelkan label produk yang mencantumkan: nama produk, komposisi, petunjuk penggunaan, peringatan, tanggal produksi, dan masa berlaku (6 bulan). Tambahkan klaim "mengandung hydrosol nilam alami" sebagai nilai jual.',
        tips: 'Desain label yang profesional sangat mempengaruhi persepsi kualitas dan harga jual. Investasi sedikit untuk desain label yang bagus akan terbayar dengan harga jual yang lebih tinggi.',
      },
      {
        stepNumber: 10,
        title: 'Uji Kualitas Produk',
        description:
          'Lakukan pengujian sederhana: (1) Uji busa — teteskan sabun di atas spons basah, harus berbusa lebat dan stabil; (2) Uji daya bersih — cuci piring berminyak, minyak harus hilang dengan 1-2 kali cuci; (3) Uji iritasi — oleskan sedikit di punggung tangan selama 15 menit, tidak boleh ada kemerahan atau gatal; (4) Uji stabilitas — simpan 1 botol selama 1 minggu, tidak boleh ada pemisahan lapisan.',
        tips: 'Catat semua hasil uji sebagai dokumentasi kualitas. Jika ada masalah, sesuaikan formula sebelum produksi massal. Minta umpan balik dari 5-10 pengguna sebelum menjual.',
      },
    ],
    totalEstimatedCost: 82000,
    estimatedRevenue: 200000,
    profitMargin: '59%',
    profitSimulation: {
      batchSize: '3 liter hydrosol → ~10 botol @500ml',
      costPerBatch: 82000,
      revenuePerBatch: 200000,
      profitPerBatch: 118000,
      monthlyBatches: 8,
      monthlyProfit: 944000,
    },
    risks: [
      {
        risk: 'Sabun terlalu encer atau terlalu kental karena dosis garam tidak tepat',
        mitigation:
          'Tambahkan garam secara bertahap (50 gram per tahap) sambil memeriksa kekentalan. Catat jumlah garam yang menghasilkan kekentalan ideal untuk dijadikan referensi batch berikutnya.',
      },
      {
        risk: 'Iritasi kulit pengguna karena pH terlalu tinggi',
        mitigation:
          'SELALU periksa dan sesuaikan pH ke kisaran 6,5-7,5 sebelum pengemasan. Lakukan uji tempel (patch test) pada kulit sebelum memasarkan.',
      },
      {
        risk: 'Sabun berubah warna atau berbau tidak sedap setelah penyimpanan',
        mitigation:
          'Pastikan penambahan sodium benzoat sebagai pengawet. Simpan di tempat sejuk dan terhindar dari sinar matahari langsung. Masa simpan maksimal 6 bulan.',
      },
      {
        risk: 'Residu patchouli alcohol dari hydrosol nilam menyebabkan alergi pada sebagian orang',
        mitigation:
          'Cantumkan komposisi lengkap pada label produk termasuk "mengandung hydrosol nilam". Meskipun jarang, beberapa individu sensitif terhadap senyawa patchouli. Sediakan informasi kontak untuk keluhan konsumen.',
      },
    ],
    technicalNotes:
      'Perhatian: Hydrosol nilam mengandung patchouli alcohol (C₁₅H₂₆O) dalam konsentrasi rendah (0,05-0,2%) yang memberikan aroma khas dan sifat antibakteri ringan. Texapon (SLES) harus berkualitas kosmetik grade, bukan industrial grade, untuk keamanan kulit. Fenomena "salt curve" pada SLES penting dipahami: penambahan garam awalnya meningkatkan viskositas, namun setelah titik optimal, penambahan garam justru menurunkan viskositas. Titik optimal biasanya tercapai pada konsentrasi NaCl 2-3% dari total volume. JANGAN gunakan panci aluminium karena hydrosol nilam yang sedikit asam akan bereaksi dengan aluminium membentuk aluminium asetat yang berbahaya. Produk ini termasuk kategori kosmetik yang jika dijual komersial memerlukan izin BPOM dan nomor registrasi.',
  },
  {
    id: 6,
    title: 'Pembuatan Pengharum Ruangan Alami dari Limbah Kayu Putih',
    slug: 'pembuatan-pengharum-ruangan-alami-limbah-kayu-putih',
    description:
      'Buat pengharum ruangan alami menggunakan limbah daun dan ranting kayu putih (Melaleuca cajuputi) sisa destilasi. Limbah ini masih mengandung sineol (eucalyptol) yang memberikan aroma segar menyegarkan sekaligus bersifat dekongestan dan antimikroba ringan. Tersedia dalam bentuk potpourri kering, sachet, dan spray aromatik.',
    difficulty: 'Sulit',
    duration: '4-5 Jam (aktif) + 5-7 Hari (pengeringan)',
    category: 'Aromaterapi & Pengharum',
    image: '/tutorials/tutorial-6.jpg',
    tools: [
      'Panci kukus (steamer) besar',
      'Nampan/loyang pengeringan',
      'Gunting tanaman',
      'Botol semprot kaca 100 ml',
      'Kantong kain tile/organza kecil',
      'Tali rami / pita dekoratif',
      'Gelas ukur 500 ml',
      'Timbangan digital',
      'Oven pengering sederhana (opsional)',
      'Saringan halus',
      'Kertas perkamen (baking paper)',
      'Alat press bunga (opsional)',
    ],
    materials: [
      {
        name: 'Limbah daun kayu putih sisa destilasi',
        quantity: 3,
        unit: 'kg',
        estimatedCost: 0,
      },
      {
        name: 'Limbah ranting kayu putih kecil',
        quantity: 1,
        unit: 'kg',
        estimatedCost: 0,
      },
      {
        name: 'Minyak kayu putih murni (penguat aroma)',
        quantity: 30,
        unit: 'ml',
        estimatedCost: 25000,
      },
      {
        name: 'Alkohol 96% (food grade)',
        quantity: 200,
        unit: 'ml',
        estimatedCost: 15000,
      },
      {
        name: 'Air suling (aquadest)',
        quantity: 500,
        unit: 'ml',
        estimatedCost: 5000,
      },
      {
        name: 'Baking soda (penyerap bau)',
        quantity: 200,
        unit: 'gram',
        estimatedCost: 8000,
      },
      {
        name: 'Bunga kering dekoratif (lavender/mawar kering)',
        quantity: 50,
        unit: 'gram',
        estimatedCost: 15000,
      },
      {
        name: 'Kantong organza kecil',
        quantity: 20,
        unit: 'buah',
        estimatedCost: 20000,
      },
      {
        name: 'Botol kaca semprot 100 ml',
        quantity: 10,
        unit: 'buah',
        estimatedCost: 35000,
      },
      {
        name: 'Tali rami / pita hias',
        quantity: 5,
        unit: 'meter',
        estimatedCost: 10000,
      },
      {
        name: 'Label dan kartu produk',
        quantity: 30,
        unit: 'lembar',
        estimatedCost: 15000,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Sortasi dan Pemilihan Bahan',
        description:
          'Pilih daun kayu putih yang masih hijau atau hijau kecokelatan dari limbah destilasi. Buang daun yang sudah hitam, busuk, atau berjamur. Pisahkan ranting kecil yang masih beraroma. Cuci bersih semua bahan dengan air mengalir untuk menghilangkan debu dan kotoran. Tiriskan selama 30 menit.',
        tips: 'Daun yang masih berwarna hijau mengandung lebih banyak senyawa aromatik. Remas selembar daun — jika masih mengeluarkan aroma segar, artinya masih mengandung cukup sineol.',
      },
      {
        stepNumber: 2,
        title: 'Pengukusan Revitalisasi Aroma',
        description:
          'Kukus daun dan ranting kayu putih selama 15-20 menit menggunakan panci kukus. Proses pengukusan membuka pori-pori daun dan melepaskan sisa minyak atsiri yang terperangkap, sehingga merevitalisasi aroma. Uap panas juga membunuh bakteri dan jamur kontaminan pada daun. Angkat dan tiriskan.',
        tips: 'Jangan mengukus terlalu lama (>30 menit) karena justru akan menguapkan habis sisa sineol. Tangkap uap kukusan dengan tutup — air kondensasi di tutup panci mengandung hydrosol yang bisa digunakan untuk spray aromatik.',
      },
      {
        stepNumber: 3,
        title: 'Pengeringan Terkontrol',
        description:
          'Tata daun dan ranting yang sudah dikukus di atas nampan yang dilapisi kertas perkamen. Sebarkan satu lapis tipis agar pengeringan merata. Keringkan di tempat teduh berventilasi baik selama 5-7 hari. JANGAN menjemur langsung di bawah sinar matahari karena UV akan mengoksidasi dan mendegradasi senyawa aromatik, menghasilkan aroma yang tidak sedap.',
        tips: 'Untuk mempercepat, gunakan oven dengan suhu rendah (40-50°C) selama 4-6 jam. Kipas angin bisa dipasang untuk meningkatkan sirkulasi udara dan mempercepat pengeringan alami.',
      },
      {
        stepNumber: 4,
        title: 'Pembuatan Potpourri Kering',
        description:
          'Setelah daun kering (terasa kaku dan ringan saat diremas), potong-potong kasar menggunakan gunting. Campurkan dengan ranting kecil yang sudah dipotong pendek (2-3 cm) dan bunga kering dekoratif. Teteskan 10-15 ml minyak kayu putih murni ke campuran dan aduk merata. Taburi 50 gram baking soda dan aduk lagi — baking soda menyerap dan melepaskan aroma secara perlahan.',
        tips: 'Tambahkan kulit jeruk kering atau kayu manis batang untuk variasi aroma. Semakin beragam komponen potpourri, semakin menarik tampilan dan kompleks aromanya.',
      },
      {
        stepNumber: 5,
        title: 'Pengemasan Sachet',
        description:
          'Isi kantong organza dengan 30-40 gram campuran potpourri. Ikat rapat dengan tali rami atau pita dekoratif. Buat simpul pita yang menarik. Teteskan 2-3 tetes minyak kayu putih murni di bagian luar kantong untuk aroma pertama (first impression) yang kuat saat dibuka. Masukkan kartu kecil dengan petunjuk penggunaan.',
        tips: 'Sachet ini bisa ditempatkan di lemari pakaian, laci, dashboard mobil, atau digantung di kamar mandi. Aroma bertahan 2-4 minggu. Konsumen bisa meremajakan aroma dengan meneteskan minyak atsiri tambahan.',
      },
      {
        stepNumber: 6,
        title: 'Pembuatan Spray Aromatik',
        description:
          'Campurkan 200 ml alkohol 96% dengan 15 ml minyak kayu putih murni dalam gelas ukur, aduk hingga larut sempurna. Tambahkan 300 ml air suling (atau hydrosol kayu putih hasil kukusan) secara perlahan sambil diaduk. Larutan mungkin sedikit keruh — ini normal. Diamkan 24 jam agar campuran stabil, lalu saring jika masih ada partikel.',
        tips: 'Urutan pencampuran PENTING: larutkan minyak dalam alkohol TERLEBIH DAHULU, baru tambahkan air. Jika air ditambahkan lebih dulu, minyak tidak akan larut dan membentuk lapisan terpisah.',
      },
      {
        stepNumber: 7,
        title: 'Pengisian Botol Spray',
        description:
          'Tuang spray aromatik ke dalam botol kaca 100 ml menggunakan corong. Gunakan botol kaca berwarna gelap (amber/cokelat) untuk melindungi senyawa aromatik dari degradasi UV. Pasang kepala semprot dan uji beberapa kali — semprotan harus halus dan merata (mist), bukan jet. Bersihkan sisa tetesan di botol dan tutup rapat.',
        tips: 'Botol kaca lebih baik daripada plastik karena alkohol dan minyak atsiri bisa melarutkan/merusak beberapa jenis plastik. Pastikan kepala semprot menghasilkan kabut halus, bukan semburan besar.',
      },
      {
        stepNumber: 8,
        title: 'Pelabelan dan Branding',
        description:
          'Desain dan tempel label produk yang menarik. Untuk sachet, gunakan kartu gantung (hang tag). Untuk spray, gunakan stiker label botol. Cantumkan: nama produk, aroma utama, komposisi, cara penggunaan, peringatan ("jangan disemprotkan langsung ke kulit/makanan"), tanggal produksi, dan masa berlaku (sachet: 3 bulan, spray: 6 bulan).',
        tips: 'Branding yang menarik adalah kunci penjualan produk aromaterapi. Gunakan nama yang elegan dan kemasan yang estetik. Tambahkan cerita produk (product story) tentang pemanfaatan limbah destilasi sebagai nilai jual unik.',
      },
      {
        stepNumber: 9,
        title: 'Pembuatan Set Hampers (Opsional)',
        description:
          'Untuk meningkatkan nilai jual, kemas produk dalam set hampers berisi: 1 botol spray aromatik 100 ml + 2 sachet potpourri + 1 botol kecil minyak kayu putih 10 ml (refill). Masukkan dalam kotak karton kraft yang dihias tali rami. Tambahkan kartu ucapan atau kartu informasi produk. Set hampers sangat laris sebagai hadiah dan oleh-oleh.',
        tips: 'Harga set hampers bisa 2-3x lipat dari harga produk individual karena nilai tambah pengemasan dan kenyamanan sebagai hadiah. Targetkan penjualan menjelang hari raya atau musim liburan.',
      },
    ],
    totalEstimatedCost: 148000,
    estimatedRevenue: 450000,
    profitMargin: '67%',
    profitSimulation: {
      batchSize: '3 kg daun + 1 kg ranting → 20 sachet + 10 botol spray',
      costPerBatch: 148000,
      revenuePerBatch: 450000,
      profitPerBatch: 302000,
      monthlyBatches: 4,
      monthlyProfit: 1208000,
    },
    risks: [
      {
        risk: 'Aroma terlalu lemah karena sineol sudah banyak menguap selama destilasi',
        mitigation:
          'Tambahkan minyak kayu putih murni sebagai penguat aroma. Pilih daun limbah yang masih berwarna hijau dan beraroma saat diremas. Proses pengukusan revitalisasi membantu memaksimalkan sisa aroma.',
      },
      {
        risk: 'Pertumbuhan jamur pada potpourri yang tidak cukup kering',
        mitigation:
          'Pastikan kadar air daun kering di bawah 10% sebelum pengemasan. Tambahkan silica gel sachet kecil di dalam kemasan. Simpan produk di tempat kering berventilasi.',
      },
      {
        risk: 'Spray aromatik terpisah menjadi dua lapisan (minyak dan air)',
        mitigation:
          'Pastikan minyak dilarutkan dalam alkohol terlebih dahulu sebelum ditambahkan air. Konsentrasi alkohol minimal 30% dari total volume membantu menjaga emulsi tetap stabil. Kocok sebelum penggunaan.',
      },
      {
        risk: 'Reaksi alergi pengguna terhadap sineol atau senyawa aromatik',
        mitigation:
          'Cantumkan peringatan pada label: "Mengandung sineol/eucalyptol alami. Hentikan penggunaan jika terjadi iritasi." Jangan klaim produk ini sebagai obat atau terapi medis. Produk ini hanya sebagai pengharum ruangan.',
      },
      {
        risk: 'Degradasi aroma oleh paparan sinar UV dan panas berlebih',
        mitigation:
          'Gunakan botol kaca gelap (amber) untuk spray. Simpan semua produk di tempat sejuk dan gelap. Cantumkan petunjuk penyimpanan pada label. Masa simpan realistis: sachet 2-3 bulan, spray 6 bulan.',
      },
    ],
    technicalNotes:
      'Perhatian: Limbah daun kayu putih (Melaleuca cajuputi) pasca-destilasi masih mengandung 1,8-sineol (eucalyptol, C₁₀H₁₈O) dalam kadar rendah (0,2-0,6%) yang memberikan aroma khas segar. Sineol bersifat dekongestan dan antimikroba ringan namun TIDAK boleh diklaim sebagai obat. Untuk spray aromatik, konsentrasi minyak atsiri total sebaiknya 2-4% dari total volume agar aroma cukup kuat namun tidak menyengat. Alkohol berfungsi sebagai pelarut (co-solvent) yang menjembatani kelarutan minyak atsiri dalam air dan sebagai pengawet. Konsentrasi alkohol minimal 20% diperlukan untuk stabilitas emulsi. Produk TIDAK boleh disemprotkan langsung ke kulit, mata, atau mukosa. TIDAK untuk dikonsumsi. Hindari penggunaan di sekitar hewan peliharaan terutama kucing — sineol bersifat toksik bagi kucing karena mereka tidak memiliki enzim glucuronosyltransferase untuk memetabolismenya. Jika produk dijual komersial, diperlukan izin edar dari BPOM kategori Kosmetik atau Perbekalan Kesehatan Rumah Tangga (PKRT).',
  },
];

/**
 * Mendapatkan tutorial berdasarkan ID
 * @param {number} id - ID tutorial
 * @returns {Object|undefined} Objek tutorial atau undefined jika tidak ditemukan
 */
export function getTutorialById(id) {
  return tutorials.find((tutorial) => tutorial.id === id);
}

/**
 * Mendapatkan tutorial berdasarkan slug URL
 * @param {string} slug - Slug tutorial
 * @returns {Object|undefined} Objek tutorial atau undefined jika tidak ditemukan
 */
export function getTutorialBySlug(slug) {
  return tutorials.find((tutorial) => tutorial.slug === slug);
}
