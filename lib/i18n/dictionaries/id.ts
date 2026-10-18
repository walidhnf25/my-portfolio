import type { Dictionary } from "./en";

// Kamus Bahasa Indonesia. Bentuknya harus sama persis dengan en.ts (dicek TypeScript).

const id: Dictionary = {
  meta: {
    title: "Portofolio | Walid Hanif Ataullah",
    description:
      "Lulusan Sarjana Rekayasa Perangkat Lunak yang berfokus pada Adopsi Teknologi Informasi, Machine Learning, Deep Learning, dan Internet of Things. Jelajahi proyek saya, baca blog teknik saya, dan hubungi saya.",
    ogDescription:
      "Software Engineer & peminat ML/DL yang berfokus pada Machine Learning, Deep Learning, dan IoT. Jelajahi proyek dan blog teknik saya.",
    twitterDescription:
      "Software Engineer & peminat ML/DL yang berfokus pada Machine Learning, Deep Learning, dan IoT.",
    siteName: "Portofolio Walid Hanif Ataullah",
  },

  nav: {
    home: "Beranda",
    about: "Tentang",
    projects: "Proyek",
    blog: "Blog",
    contact: "Kontak",
  },

  common: {
    backToTop: "Walid Hanif Ataullah, kembali ke atas",
    toggleTheme: "Ganti tema",
    toggleMenu: "Buka/tutup menu",
    language: "Bahasa",
    switchLanguage: "Ganti bahasa",
    notFoundTitle: "Halaman tidak ditemukan",
    notFoundText: "Halaman yang kamu cari tidak ada.",
    goHome: "Kembali ke beranda",
    previous: "Sebelumnya",
    next: "Berikutnya",
    goToSlide: "Ke slide {n}",
  },

  profile: {
    roles: ["Software Engineer", "ML/DL Enthusiast", "IoT Explorer"],
    tagline: "Membangun sistem cerdas yang menjembatani kebutuhan manusia dan teknologi.",
    summary:
      "Lulusan Rekayasa Perangkat Lunak dengan rasa ingin tahu seorang peneliti dan disiplin seorang insinyur. Saya menekuni AI, machine learning, deep learning, dan IoT, membawa ide dari eksperimen pertama hingga menjadi sistem yang berjalan di dunia nyata.",
    summarySecondary:
      "Saya paling menikmati fase yang berantakan, ketika ide yang masih samar atau data yang belum tertata perlahan menjadi sesuatu yang jelas, berguna, dan sedikit elegan.",
    quote:
      "Teknologi bukan sekadar kode. Teknologi adalah tentang memecahkan masalah nyata dan menciptakan dampak yang berarti.",
  },

  splash: {
    hi: "Hai, saya Walid Hanif",
    welcome: "Selamat datang di Portofolio saya",
  },

  hero: {
    badge: "Terbuka untuk kolaborasi",
    downloadCv: "Unduh CV",
    viewWork: "Lihat Karya",
    scroll: "Gulir",
    scrollToAbout: "Gulir ke bagian tentang",
    boatLabel:
      "Perahu kayu yang tenggelam di dasar laut, dengan gelembung naik ke atas dan rumput laut yang bergoyang",
  },

  about: {
    eyebrow: "Tentang",
    title: "Insinyur di balik",
    accent: "inovasinya",
    description:
      "Perkenalan singkat tentang siapa saya dan bagaimana saya bekerja.",
    areasLabel: "Bidang Keahlian",
    competenciesLabel: "Kompetensi Utama",
    game: {
      title: "Dolphin Dash",
      label: "Permainan Dolphin Dash. Tekan Spasi atau ketuk untuk melompati pelampung dan jaring nelayan.",
      start: "Tekan Spasi atau ketuk untuk bermain",
      again: "Ketuk atau tekan Spasi untuk main lagi",
      paused: "Dijeda. Ketuk untuk lanjut",
      over: "Permainan selesai",
      score: "Skor",
      best: "Terbaik",
    },
    expertiseAreas: [
      "Adopsi Teknologi Informasi",
      "Machine Learning & Deep Learning",
      "Internet of Things (IoT)",
      "Rekayasa Perangkat Lunak",
    ],
    coreCompetencies: [
      "Rekayasa Perangkat Lunak",
      "Machine Learning & Deep Learning",
      "Solusi Berbasis Data",
      "Inovasi Berbasis AI",
      "Riset & Pengembangan",
    ],
  },

  projects: {
    eyebrow: "Proyek Pilihan",
    title: "Membangun solusi",
    accent: "yang berarti",
    description:
      "Pilihan karya yang pernah saya bangun, beserta masalah yang ingin diselesaikannya.",
    viewDetails: "Lihat detail",
    detail: {
      back: "Kembali ke proyek",
      all: "Semua proyek",
      visit: "Kunjungi situs",
      role: "Peran — ",
      contribution: "Kontribusi saya",
      builtWith: "Dibangun dengan",
      gallery: "Galeri",
      placeholder: "Placeholder",
      notFound: "Proyek tidak ditemukan",
      defaultRole: "Fullstack Engineer",
      defaultContribution:
        "Merancang dan merilis seluruh fitur inti dari awal sampai akhir, mulai dari model data hingga production.",
      defaultGallery: ["Gambaran umum", "Layar utama", "Tampilan detail", "Tata letak mobile"],
    },
    items: {
      "apj-gate": {
        category: "Energi & Utilitas",
        role: "Fullstack Developer (Magang)",
        description:
          "Sistem monitoring dan manajemen berbasis web untuk penerangan jalan umum, mendukung kontrol operasional, optimasi energi, dan efisiensi pemeliharaan. Membangun fitur audit energi eksekutif yang menganalisis konsumsi, efisiensi biaya, TCOO, dan dampak ESG.",
        contribution:
          "Merancang dan membangun fitur audit energi eksekutif untuk platform manajemen penerangan jalan menggunakan Angular dan Node.js (Serverless Framework), dengan logika perhitungan metrik ESG, TCOO (12 tahun), dan efisiensi investasi.",
      },
      "prabayar-pintar-prapin": {
        category: "Energi & Utilitas",
        role: "Fullstack Developer (Magang)",
        description:
          "Aplikasi mobile untuk memantau, mengelola, dan mengoptimalkan penggunaan listrik rumah tangga melalui pelacakan real-time, integrasi perangkat pintar, dan isi ulang token yang mudah. Mengimplementasikan konektivitas IoT: pairing Bluetooth, konfigurasi Wi-Fi, dan protokol handshaking.",
        contribution:
          "Menyempurnakan aplikasi manajemen energi berbasis Flutter dengan menata ulang alur onboarding perangkat, merancang ulang antarmuka input smart meter, dan mengimplementasikan fitur konektivitas IoT (Bluetooth, Wi-Fi, handshaking) serta integrasi OpenWeather API.",
      },
      trafacomm: {
        category: "Energi & Utilitas",
        role: "Fullstack Developer (Magang)",
        description:
          "Transformer Advanced Commissioning adalah aplikasi mobile yang mendukung pemantauan, pelacakan, dan instalasi trafo di lapangan melalui alur kerja manajemen aset yang terstruktur dan terintegrasi.",
        contribution:
          "Mengembangkan frontend mobile menggunakan Flutter dan RESTful API untuk mendukung manajemen aset trafo secara real-time, alur instalasi di lapangan, dan konfigurasi pelacakan jarak jauh.",
      },
      "gps-tracker": {
        category: "Armada & Pelacakan",
        role: "Fullstack Developer (Magang)",
        description:
          "Dashboard web untuk memantau dan melacak lokasi perangkat secara real-time, dengan manajemen multi-perangkat, riwayat lokasi, dan penyaringan data pelacakan yang dibangun di atas Serverless Framework dan Angular.",
        contribution:
          "Mengembangkan sistem pelacakan GPS real-time berbasis web menggunakan Angular dan Node.js Serverless Framework, yang memungkinkan pemantauan multi-perangkat, pelacakan lokasi langsung, dan penyaringan data historis.",
      },
      "stroomer-company-website": {
        category: "Korporat",
        role: "Fullstack Developer (Magang)",
        description:
          "Situs web perusahaan yang mempromosikan layanan, produk, dan peluang karier. Membangun fitur kontak dan rekrutmen (daftar lowongan, unggah CV, dan otomatisasi email) dengan Astro, Serverless, dan Sanity CMS.",
        contribution:
          "Meningkatkan fitur platform korporat menggunakan Astro, Node.js (Serverless), dan Sanity CMS; membangun API backend untuk alur rekrutmen otomatis, unggah CV, dan notifikasi email otomatis melalui Nodemailer.",
      },
      "palm-oil-machine-analytics": {
        category: "Analitik",
        role: "Asisten Peneliti",
        description:
          "Dashboard analitik real-time dan historis untuk mesin pengolahan kelapa sawit, mengintegrasikan computer vision untuk menganalisis parameter operasional dan mendukung deteksi anomali.",
        contribution:
          "Mengembangkan dashboard analitik web real-time menggunakan Laravel yang terintegrasi dengan computer vision untuk menerima, memvisualisasikan, dan memantau parameter mesin demi deteksi anomali otomatis.",
      },
      "e-laman-hati": {
        category: "Pemerintahan",
        role: "Asisten Peneliti",
        description:
          "Platform digital yang dibangun bersama DKPP Kota Bandung untuk pengelolaan data kesehatan hewan: pendaftaran, pemantauan, pelacakan vaksinasi, dan pelaporan publik. Memimpin tim mahasiswa dengan Agile Scrum.",
        contribution:
          "Memimpin tim pengembang mahasiswa dengan Agile Scrum untuk membangun ulang sistem manajemen kesehatan hewan berbasis mobile bagi Pemerintah Kota Bandung (DKPP), mencakup pendaftaran dan pelacakan vaksinasi.",
      },
      "kacir-fnb": {
        category: "Bisnis",
        role: "Asisten Peneliti",
        description:
          "Aplikasi mobile point-of-sale (POS) yang menyederhanakan transaksi penjualan, pemrosesan pembayaran, dan operasional bisnis dengan pelaporan terintegrasi dan manajemen multi-outlet.",
        contribution:
          "Menjadi Agile Scrum Lead dalam pengembangan aplikasi mobile Point-of-Sale (POS), mengimplementasikan pemrosesan transaksi, manajemen multi-outlet, dan pelaporan penjualan otomatis.",
      },
      "hadir-in": {
        category: "Bisnis",
        role: "Asisten Peneliti",
        description:
          "Platform web untuk menyederhanakan manajemen rapat dan kehadiran, dengan pengisian formulir yang dapat dikonfigurasi, pencatatan kehadiran, pemantauan real-time, dan pelaporan PDF otomatis.",
        contribution:
          "Menyempurnakan platform pencatatan kehadiran organisasi berbasis web menggunakan Laravel dan MySQL, dengan formulir dinamis dan pelaporan PDF otomatis untuk meningkatkan efisiensi administrasi.",
      },
      "dkpp-store": {
        category: "Pemerintahan",
        role: "Asisten Peneliti",
        description:
          "Portal aplikasi untuk DKPP Kota Bandung guna mengelola, mendistribusikan, dan memamerkan solusi inovasi digital di bidang pertanian dan ketahanan pangan bagi masyarakat dan pemangku kepentingan.",
        contribution:
          "Mengembangkan portal aplikasi web menggunakan Laravel dan MySQL untuk DKPP Kota Bandung guna memamerkan dan menyediakan akses publik terpusat ke inovasi digital di bidang ketahanan pangan.",
      },
      "e-buruan-sae-dashboard": {
        category: "Pemerintahan",
        role: "Asisten Peneliti",
        description:
          "Dashboard untuk DKPP Kota Bandung yang mengelola data pertanian: pencatatan panen, prediksi, dan pelacakan distribusi untuk program pertanian perkotaan.",
        contribution:
          "Meningkatkan dashboard web pertanian perkotaan menggunakan CodeIgniter dan MySQL, dengan fitur manajemen data untuk prediksi panen dan pelacakan distribusi hasil pertanian.",
      },
      "jadwal-in": {
        category: "Bisnis",
        role: "Asisten Peneliti",
        description:
          "Sistem manajemen jadwal barista untuk pengelolaan tenaga kerja multi-outlet, dengan perencanaan shift yang fleksibel, alur persetujuan, dan koordinasi real-time.",
        contribution:
          "Membangun sistem web perencanaan shift tenaga kerja multi-outlet menggunakan Laravel dan MySQL untuk mengoptimalkan koordinasi shift, alur persetujuan, dan efisiensi operasional ritel secara real-time.",
      },
      simona: {
        category: "Pemerintahan",
        role: "Fullstack Developer (Magang)",
        description:
          "Sistem manajemen pegawai non-ASN untuk Pemerintah Kabupaten Tangerang, mengelola data dan profil tenaga kerja non-PNS untuk meningkatkan efisiensi administrasi.",
        contribution:
          "Merancang dan membangun platform web pemerintah daerah menggunakan Laravel dan MySQL untuk mengelola data tenaga kerja non-PNS dan mengoptimalkan pencatatan administrasi.",
      },
    },
  },

  blog: {
    eyebrow: "Blog",
    title: "Catatan membangun",
    accent: "software yang lebih baik",
    description: "Bacaan singkat seputar rekayasa perangkat lunak dan teknologi, dari apa yang saya pelajari di sepanjang jalan.",
    metaTitle: "Blog | Walid Hanif Ataullah",
    readArticle: "Baca artikel",
    minRead: "{n} menit baca",
    backHome: "Kembali ke beranda",
    notFound: "Artikel tidak ditemukan",
    detail: {
      back: "Kembali ke blog",
      all: "Semua artikel",
      contents: "Di halaman ini",
      takeaway: "Kesimpulan",
      closingQuestion: "Pertanyaan untukmu",
    },
  },

  contact: {
    eyebrow: "Kontak",
    title: "Mari membangun sesuatu",
    accent: "bersama",
    description:
      "Punya proyek, kolaborasi riset, atau peluang yang ingin dibicarakan? Kotak masuk saya selalu terbuka.",
    methods: {
      email: "Email",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      location: "Lokasi",
    },
    form: {
      name: "Nama *",
      namePlaceholder: "Nama kamu",
      email: "Email *",
      emailPlaceholder: "kamu@email.com",
      subject: "Subjek",
      subjectPlaceholder: "Peluang kolaborasi",
      message: "Pesan *",
      messagePlaceholder: "Ceritakan kepada saya...",
      send: "Kirim pesan",
      sending: "Mengirim...",
      successTitle: "Pesan terkirim!",
      successText: "Terima kasih sudah menghubungi. Saya akan membalas secepat mungkin.",
      sendAnother: "Kirim pesan lain",
      errorRequired: "Nama, email, dan pesan wajib diisi.",
      errorGeneric: "Terjadi kesalahan. Silakan coba lagi.",
    },
  },

  footer: {
    navigate: "Navigasi",
    connect: "Terhubung",
    rights: "Hak cipta dilindungi.",
    builtWith: "Dibangun dengan Next.js · Three.js · Framer Motion",
  },
};

export default id;
