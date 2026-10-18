// Indonesian post content (the original text). Metadata shared by every locale
// lives in ../posts.ts.

import type { PostContent } from "../types";

const id: Record<string, PostContent> = {
  "your-code-works-but-can-it-scale": {
    title: "Your Code Works. But Can It Scale?",
    excerpt:
      "Aplikasi lancar di local, lalu pengguna bertambah. Langkah pertama scalability biasanya jauh lebih sederhana dari microservices: temukan bottleneck, ukur, baru perbaiki.",
    intro: [
      {
        type: "p",
        text: "Aplikasi berjalan lancar di local environment. API merespons dengan cepat. Lalu, jumlah pengguna meningkat.",
      },
      {
        type: "p",
        text: "Response time mulai naik. Query database semakin lambat. Beberapa request mengalami timeout.",
      },
      {
        type: "p",
        text: "Scalability bukan berarti kita harus langsung menggunakan microservices, Kubernetes, atau infrastruktur yang kompleks. Sering kali, langkah pertamanya justru lebih sederhana:",
      },
      {
        type: "list",
        items: [
          "Identify the bottleneck.",
          "Optimize database access.",
          "Use caching wisely.",
          "Choose the right scaling strategy.",
          "Measure performance.",
        ],
      },
      {
        type: "p",
        text: "Hal terpenting: jangan melakukan optimasi berdasarkan asumsi semata. Ukur terlebih dahulu, temukan bottleneck, lakukan perbaikan, lalu verifikasi hasilnya.",
      },
    ],
    sections: [
      {
        kicker: "The Scalability Problem",
        heading: "It works in development. Then traffic grows.",
        blocks: [
          {
            type: "p",
            text: "Aplikasi yang berjalan lancar pada kondisi ringan dapat mengalami masalah saat beban meningkat. Aplikasi yang melayani 10 pengguna belum tentu siap untuk 10.000 pengguna.",
          },
          {
            type: "list",
            items: [
              "Response time semakin tinggi.",
              "Database mulai kewalahan.",
              "Request mengalami timeout.",
              "Pengguna mengalami error.",
            ],
          },
          {
            type: "quote",
            text: "More users don't just mean more requests. They expose your system's bottlenecks.",
          },
        ],
      },
      {
        kicker: "Find the Bottleneck",
        heading: "Your server might not be the problem",
        blocks: [
          {
            type: "p",
            text: "Ketika aplikasi melambat, menambah server bukan selalu solusi pertama. Cari dulu di mana waktu benar-benar habis.",
          },
          {
            type: "cards",
            items: [
              { title: "API / Application", text: "CPU tinggi, blocking operations, atau proses yang lambat." },
              { title: "Database", text: "Query mahal, missing indexes, atau connection pool yang penuh." },
              { title: "External Services", text: "API pihak ketiga lambat atau mengalami kegagalan." },
            ],
          },
          { type: "quote", text: "Measure first. Optimize the actual bottleneck." },
        ],
      },
      {
        kicker: "Database Performance",
        heading: "One bad query can slow everything down",
        blocks: [
          { type: "p", text: "Contoh query yang mencari pengguna berdasarkan email:" },
          {
            type: "code",
            label: "Without an appropriate index",
            tone: "bad",
            lang: "sql",
            code: "SELECT *\nFROM users\nWHERE email = 'user@example.com';",
          },
          {
            type: "p",
            text: "Pada tabel besar, database mungkin perlu memeriksa banyak baris jika tidak ada indeks yang sesuai.",
          },
          {
            type: "code",
            label: "With an appropriate index",
            tone: "good",
            lang: "sql",
            code: "CREATE INDEX idx_users_email\nON users(email);",
          },
          {
            type: "p",
            text: "Indeks dapat mempercepat pencarian yang sesuai, tetapi manfaatnya bergantung pada query, distribusi data, dan query plan.",
          },
          {
            type: "note",
            text: "Indeks menambah kebutuhan penyimpanan dan biaya pada operasi tulis. Verifikasi dampaknya dengan EXPLAIN atau EXPLAIN ANALYZE.",
          },
          { type: "quote", text: "Scaling starts with understanding your data access patterns." },
        ],
      },
      {
        kicker: "Caching",
        heading: "Stop repeating expensive work",
        blocks: [
          {
            type: "p",
            text: "Jika data yang sama sering dibaca dan tidak selalu berubah, caching dapat mengurangi pekerjaan berulang. Alurnya sederhana:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "Client request masuk.",
              "Cache lookup.",
              "Cache hit: kembalikan data dari cache.",
              "Cache miss: query database, lalu simpan hasilnya ke cache.",
            ],
          },
          {
            type: "p",
            text: "Caching dapat mengurangi beban database dan mempercepat response time untuk workload yang cocok. Namun, caching juga membawa tantangan: data kedaluwarsa, invalidation, dan konsistensi.",
          },
          { type: "quote", text: "Faster reads are useful only when the data remains correct." },
        ],
      },
      {
        kicker: "Scaling Strategies",
        heading: "Scale up or scale out?",
        blocks: [
          {
            type: "cards",
            items: [
              {
                title: "Vertical scaling (scale up)",
                text: "Tambahkan CPU, RAM, atau kapasitas pada satu mesin. Lebih sederhana, tetapi kapasitas mesin tetap memiliki batas.",
              },
              {
                title: "Horizontal scaling (scale out)",
                text: "Jalankan beberapa instance aplikasi di belakang load balancer. Dapat meningkatkan kapasitas, tetapi memerlukan perhatian pada state, koordinasi, dan database.",
              },
            ],
          },
          {
            type: "p",
            text: "Tidak ada strategi yang selalu terbaik. Pilihan bergantung pada pola trafik, biaya, batas sistem, kebutuhan availability, dan kompleksitas operasional.",
          },
        ],
      },
      {
        kicker: "Test Before You Scale",
        heading: "Don't guess. Load test.",
        blocks: [
          {
            type: "p",
            text: "Sebelum mengklaim aplikasi siap menghadapi banyak pengguna, uji perilakunya di bawah beban yang realistis. Perhatikan metrik seperti:",
          },
          {
            type: "cards",
            items: [
              { title: "Latency", text: "p95 dan p99 response time." },
              { title: "Throughput", text: "Request yang berhasil diproses per detik." },
              { title: "Error rate", text: "Persentase request yang gagal." },
              { title: "Resource usage", text: "CPU, memory, dan koneksi database." },
            ],
          },
          {
            type: "p",
            text: "Mulai dengan load test, temukan bottleneck, lakukan perbaikan, lalu uji kembali.",
          },
          {
            type: "quote",
            text: "A system is only as scalable as its measured capacity and its weakest bottleneck.",
          },
        ],
      },
    ],
    takeaway: {
      heading: "Build for today's needs. Prepare for tomorrow's growth.",
      blocks: [
        {
          type: "p",
          text: "Kamu tidak harus langsung menggunakan microservices, Kubernetes, atau arsitektur yang kompleks. Mulailah dengan fondasi yang tepat:",
        },
        {
          type: "list",
          items: [
            "Tulis query yang efisien.",
            "Ukur performa sistem.",
            "Gunakan caching jika sesuai.",
            "Uji kapasitas sebelum trafik meningkat.",
            "Scale berdasarkan bukti, bukan asumsi.",
          ],
        },
        {
          type: "quote",
          text: "Scalability is not about handling infinite traffic. It's about growing without losing control.",
        },
      ],
    },
    closingQuestion: "Bottleneck pertama apa yang akan kamu selidiki ketika sebuah API mulai melambat?",
  },
  "clean-code-is-about-clarity": {
    title: "Clean Code Is Not About Making Code Look Pretty",
    excerpt:
      "Code yang rapi memang menyenangkan dilihat, tapi itu baru permulaan. Clean code berarti clarity, bukan cosmetics: mudah dipahami, diubah, diuji, dan dirawat.",
    intro: [
      {
        type: "p",
        text: "Code yang rapi memang menyenangkan untuk dilihat, tetapi itu baru permulaan. Pernahkah kamu membaca code yang terlihat rapi, tetapi tetap sulit dipahami?",
      },
      {
        type: "list",
        items: [
          "Mungkin nama variabelnya terlalu abstrak.",
          "Mungkin satu fungsi menangani terlalu banyak tanggung jawab.",
          "Atau mungkin business logic yang sama tersebar di berbagai bagian aplikasi.",
        ],
      },
      {
        type: "p",
        text: "Di sinilah clean code menjadi lebih dari sekadar estetika. Clean code membantu kita menulis software yang lebih mudah:",
      },
      {
        type: "cards",
        items: [
          { title: "Read", text: "Dipahami tanpa menebak-nebak." },
          { title: "Change", text: "Diubah tanpa efek samping yang tidak perlu." },
          { title: "Test", text: "Diverifikasi dengan lebih terarah." },
          { title: "Maintain", text: "Dirawat dalam jangka panjang." },
        ],
      },
    ],
    sections: [
      {
        kicker: "The Misconception",
        heading: "Clean code ≠ pretty code",
        blocks: [
          { type: "p", text: "Banyak developer menganggap clean code berarti:" },
          {
            type: "list",
            items: [
              "Indentation yang rapi.",
              "Format yang konsisten.",
              "Tidak ada baris code yang terlalu panjang.",
            ],
          },
          {
            type: "p",
            text: "Hal tersebut memang membantu, tetapi formatting saja tidak membuat code menjadi clean. Code bisa terlihat rapi tetapi tetap sulit dipahami, penuh duplikasi, dan berisiko ketika diubah.",
          },
        ],
      },
      {
        kicker: "Readability",
        heading: "Code is read more often than it is written",
        blocks: [
          {
            type: "p",
            text: "Developer tidak hanya menulis code. Mereka juga harus membaca, memahami, melakukan debugging, dan mengubah code yang sudah ada.",
          },
          {
            type: "code",
            label: "Before · Unclear",
            tone: "bad",
            lang: "ts",
            code: "const d = 86400000;\nconst x = users.filter(\n  u => u.a && u.l < Date.now() - d\n);",
          },
          {
            type: "code",
            label: "After · More expressive",
            tone: "good",
            lang: "ts",
            code: "const ONE_DAY_MS = 86_400_000;\n\nconst dormantUsers = users.filter(\n  user =>\n    user.isActive &&\n    user.lastLoginAt <\n      Date.now() - ONE_DAY_MS\n);",
          },
          {
            type: "note",
            text: "Contoh ilustratif: nama variabel yang jelas membantu pembaca memahami maksud code tanpa harus menebak arti setiap singkatan.",
          },
        ],
      },
      {
        kicker: "Meaningful Names",
        heading: "Good names reduce mental effort",
        blocks: [
          { type: "p", text: "Bandingkan kedua contoh berikut." },
          {
            type: "code",
            label: "Not ideal",
            tone: "bad",
            lang: "ts",
            code: "function calc(p: number, q: number) {\n  return p * q;\n}",
          },
          {
            type: "code",
            label: "Clearer",
            tone: "good",
            lang: "ts",
            code: "function calculateTotalPrice(\n  unitPrice: number,\n  quantity: number\n) {\n  return unitPrice * quantity;\n}",
          },
          { type: "quote", text: "The goal is not longer names. It's clearer intent." },
          {
            type: "p",
            text: "Nama yang baik menjelaskan maksud code, bukan sekadar tipe data atau langkah yang dilakukan.",
          },
        ],
      },
      {
        kicker: "Single Responsibility",
        heading: "One function, one clear responsibility",
        blocks: [
          {
            type: "p",
            text: "Fungsi yang melakukan terlalu banyak hal lebih sulit dipahami, diuji, dan diperbaiki.",
          },
          {
            type: "code",
            label: "Too many responsibilities",
            tone: "bad",
            lang: "ts",
            code: 'async function registerUser(input: RegisterInput) {\n  if (!input.email.includes("@")) throw new Error();\n  const user = await db.users.insert(input);\n  await mailer.send(user.email, "Welcome!");\n  return user;\n}',
          },
          {
            type: "code",
            label: "Clearer orchestration",
            tone: "good",
            lang: "ts",
            code: "async function registerUser(input: RegisterInput) {\n  const validatedInput = validateInput(input);\n  const user = await createUser(validatedInput);\n  await sendWelcomeEmail(user);\n  return user;\n}",
          },
          {
            type: "p",
            text: "Memisahkan tanggung jawab ke fungsi yang bermakna dapat membuat alur lebih jelas. Namun, fungsi kecil bukan tujuan tersendiri: abstraksi tambahan harus benar-benar meningkatkan kejelasan.",
          },
        ],
      },
      {
        kicker: "Duplication",
        heading: "Duplication makes change expensive",
        blocks: [
          {
            type: "p",
            text: "Jika business logic yang sama tersebar di banyak tempat, perubahan kecil bisa membutuhkan banyak perbaikan. Misalnya, aturan diskon pelanggan premium disalin ke tiga fungsi berbeda. Ketika aturan berubah, satu implementasi bisa tertinggal dan menghasilkan perilaku yang tidak konsisten.",
          },
          { type: "p", text: "Prinsip yang perlu diingat:" },
          {
            type: "list",
            items: [
              "Hindari duplikasi business logic yang sama.",
              "Ekstrak fungsi bersama ketika memang ada aturan atau perilaku yang sama.",
              "Jangan membuat abstraksi hanya karena dua potongan code terlihat mirip.",
            ],
          },
          { type: "quote", text: "Good abstraction reduces duplication without hiding intent." },
        ],
      },
      {
        kicker: "Maintainability",
        heading: "Clean code makes change safer",
        blocks: [
          {
            type: "p",
            text: "Code yang mudah dipahami akan lebih mudah dikembangkan seiring berubahnya kebutuhan. Beberapa cirinya:",
          },
          {
            type: "list",
            items: [
              "Nama dan struktur mencerminkan business logic.",
              "Setiap fungsi memiliki tujuan yang jelas.",
              "Error ditangani secara eksplisit.",
              "Test memverifikasi perilaku penting.",
              "Abstraksi tidak lebih rumit daripada masalahnya.",
            ],
          },
          {
            type: "p",
            text: "Clean code bukan berarti tidak pernah berubah. Clean code membantu perubahan dilakukan dengan risiko yang lebih terkendali.",
          },
        ],
      },
    ],
    takeaway: {
      heading: "Clean code is about clarity, not cosmetics.",
      blocks: [
        {
          type: "p",
          text: "Code yang baik bukan sekadar code yang terlihat rapi. Code yang baik membantu developer berikutnya memahami:",
        },
        {
          type: "list",
          items: ["What does this code do?", "Why does it exist?", "How can I change it safely?"],
        },
        { type: "quote", text: "Write code for the next person who has to read it." },
      ],
    },
    closingQuestion:
      "Menurut kamu, apa kebiasaan clean code yang paling berdampak pada kualitas software yang kamu bangun?",
  },
  "production-ready-software": {
    title: "Code Kamu Sudah Jalan. Tapi Apakah Production-Ready?",
    excerpt:
      "Working software dan production-ready software bukan hal yang sama. Lima aspek yang membedakannya: error handling, validasi data, security, testing & observability, dan maintainability.",
    intro: [
      {
        type: "p",
        text: "Code yang berjalan dengan baik belum tentu siap digunakan di production.",
      },
      {
        type: "p",
        text: "Fitur berhasil dijalankan dan tidak ada error, tapi software di dunia nyata menghadapi kondisi yang jauh lebih kompleks daripada local environment. Di sinilah perbedaan antara working software dan production-ready software mulai terlihat.",
      },
      { type: "p", text: "Lima aspek yang perlu diperhatikan:" },
      {
        type: "list",
        items: [
          "Error Handling",
          "Data Validation & Integrity",
          "Security",
          "Testing & Observability",
          "Maintainability",
        ],
      },
    ],
    sections: [
      {
        kicker: "The Misconception",
        heading: "“Di laptop saya jalan.”",
        blocks: [
          {
            type: "p",
            text: "Demo yang berhasil hanya membuktikan satu alur eksekusi berjalan pada kondisi tertentu. Itu tidak membuktikan aplikasi akan bekerja dengan benar di kondisi dunia nyata.",
          },
          {
            type: "list",
            items: [
              "Bagaimana jika API gagal merespons?",
              "Bagaimana jika pengguna memasukkan data yang tidak valid?",
              "Bagaimana jika ada celah keamanan?",
              "Bagaimana jika aplikasi harus menangani ribuan request secara bersamaan?",
            ],
          },
        ],
      },
      {
        kicker: "Error Handling",
        heading: "Apa yang terjadi saat sesuatu gagal?",
        blocks: [
          {
            type: "p",
            text: "Kegagalan tidak bisa dihindari. Tangani dengan aman dan terprediksi.",
          },
          {
            type: "code",
            label: "Implementasi rapuh",
            tone: "bad",
            lang: "ts",
            code: "const user = await fetchUser(id);\nconst profile = await fetchProfile(user.id);\nreturn profile;",
          },
          {
            type: "code",
            label: "Implementasi lebih tangguh",
            tone: "good",
            lang: "ts",
            code: 'try {\n  const user = await fetchUser(id);\n  const profile = await fetchProfile(user.id);\n  return profile;\n} catch (error) {\n  logger.error("Failed to fetch profile",\n    { userId: id, error });\n  throw new ProfileUnavailableError();\n}',
          },
        ],
      },
      {
        kicker: "Data Validation & Integrity",
        heading: "Apa yang terjadi saat input tidak valid?",
        blocks: [
          {
            type: "p",
            text: "Validasi input dan terapkan aturan bisnis di batas sistemmu.",
          },
          {
            type: "code",
            lang: "ts",
            code: 'import { z } from "zod";\n\nconst UserSchema = z.object({\n  email: z.string().email(),\n  age: z.number().int().min(18),\n});\n\nconst result = UserSchema.safeParse(req.body);\nif (!result.success) {\n  return res.status(400).json({\n    error: "Invalid request data",\n  });\n}',
          },
          {
            type: "note",
            text: "Gunakan juga constraint database untuk menjaga integritas data.",
          },
        ],
      },
      {
        kicker: "Security",
        heading: "Apa yang terjadi saat seseorang menyalahgunakan sistem?",
        blocks: [
          {
            type: "p",
            text: "Aplikasi bisa berjalan benar, tetapi tetap membocorkan data sensitif atau mengizinkan operasi tanpa izin.",
          },
          {
            type: "cards",
            items: [
              { title: "Otorisasi", text: "Autentikasi ≠ otorisasi. Verifikasi akses ke setiap resource." },
              { title: "Penanganan input", text: "Gunakan query berparameter dan output encoding yang aman." },
              { title: "Manajemen kredensial", text: "Jauhkan API key dan kredensial dari source control dan log." },
              { title: "Pencegahan penyalahgunaan", text: "Terapkan rate limit dan kontrol resource bila perlu." },
            ],
          },
        ],
      },
      {
        kicker: "Testing & Observability",
        heading: "Bagaimana kita tahu sistem berjalan andal?",
        blocks: [
          {
            type: "p",
            text: "Testing mencegah regresi. Observability membantu memahami apa yang terjadi di production.",
          },
          {
            type: "cards",
            items: [
              {
                title: "Testing",
                text: "Sebelum dan saat deployment.",
                points: [
                  "Unit test untuk logika individual",
                  "Integration test untuk interaksi antar komponen",
                  "End-to-end test untuk alur kerja kritis",
                  "Failure-path test untuk skenario error",
                ],
              },
              {
                title: "Observability",
                text: "Di production.",
                points: [
                  "Logs: apa yang terjadi?",
                  "Metrics: bagaimana perilaku sistem?",
                  "Traces: di mana waktu sebuah request habis?",
                ],
              },
            ],
          },
        ],
      },
      {
        kicker: "Maintainability",
        heading: "Apakah developer lain bisa mengubah code kamu dengan aman?",
        blocks: [
          { type: "p", text: "Software terus berkembang setelah rilis pertama." },
          {
            type: "cards",
            items: [
              { title: "Struktur jelas", text: "Tanggung jawab mudah dikenali." },
              { title: "Kontrak eksplisit", text: "Fungsi dan modul berperilaku terprediksi." },
              { title: "Test yang bermakna", text: "Perilaku penting terlindungi dari regresi." },
              {
                title: "Dokumentasi berguna",
                text: "Keputusan desain dan trade-off yang tidak terlihat dari code dijelaskan.",
              },
              { title: "Kompleksitas terkendali", text: "Setiap abstraksi ada alasannya." },
            ],
          },
        ],
      },
    ],
    takeaway: {
      heading: "Production-ready adalah kumpulan praktik. Bukan sekadar satu checkbox.",
      blocks: [
        {
          type: "p",
          text: "Software yang andal dibangun lewat keputusan yang dipikirkan dengan matang, yaitu error handling, data integrity, security, testing, observability, dan maintainability.",
        },
      ],
    },
    closingQuestion:
      "Menurut kamu, aspek apa yang paling sering diabaikan developer ketika membangun aplikasi untuk production?",
  },
};

export default id;
