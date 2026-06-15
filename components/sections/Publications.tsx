"use client";

import { motion } from "framer-motion";

const publications = [
  {
    title: "Pose-Based Action Recognition in Tennis Using MediaPipe and LSTM",
    year: "2025",
    journal: "IJoICT (International Journal on Information and Communication Technology), Vol. 11, No. 2, pp. 118–135",
    publisher: "Telkom University",
    authors: "Walid Hanif Ataullah, Isa Mulia Insan, Sheina Fathur Rahman",
    role: "1st Author",
    indexing: "SINTA 3",
    tags: ["MediaPipe", "LSTM", "Pose Recognition"],
    link: "https://journals.telkomuniversity.ac.id/ijoict/article/view/9622",
  },
  {
    title: "Optimizing Barista Shift Scheduling in Multi-Branches Through System Development Using Design Thinking",
    year: "2025",
    journal: "ICoSEIT 2025",
    publisher: "IEEE",
    authors: "Walid Hanif Ataullah, Rahmat Yasirandi, Rahmat Panji Wirayudha, Arga Ramadhana, Rahmat Indra Pratama Anom, Kobthong Ladkoom",
    role: "1st Author & Presenter",
    indexing: "Scopus",
    tags: ["Design Thinking", "Scheduling", "SUS Score 87.3"],
    link: "https://ieeexplore.ieee.org/abstract/document/11290953",
  },
  {
    title: "Optimized Semantic Segmentation for Fish Detection Using DeepLabV3 and MobileNetV3 on Resource-Constrained Systems",
    year: "2025",
    journal: "ICSECS 2025",
    publisher: "IEEE",
    authors: "Jonathan Arya Wibowo, Walid Hanif Ataullah, Isa Mulia Insan, Sheina Fathur Rahman, Muhammad Al Makky, Rio Guntur Utomo",
    role: "2nd Author & Presenter",
    indexing: "Scopus",
    tags: ["DeepLabV3", "MobileNetV3", "Semantic Segmentation", "Dice 0.6853"],
    link: "https://ieeexplore.ieee.org/abstract/document/11279067",
  },
  {
    title: "Frontend Design and Implementation of a Research Dashboard for the PPM Directorate Using the Agile Scrum Methodology",
    year: "2025",
    journal: "ICoSEIT 2025",
    publisher: "IEEE",
    authors: "Sheina Fathur Rahman, Walid Hanif Ataullah, Rahmat Yasirandi, Jonathan Arya Wibowo, Isa Mulia Insan, Muhamad Al Makky",
    role: "2nd Author",
    indexing: "Scopus",
    tags: ["Agile Scrum", "Research Dashboard", "Frontend"],
    link: "https://ieeexplore.ieee.org/abstract/document/11290847",
  },
  {
    title: "A Digital Solution for Zoo Health Management: Ensuring Continuity of Care Without In-House Veterinarians",
    year: "2025",
    journal: "ICoSEIT 2025",
    publisher: "IEEE",
    authors: "Sheina Fathur Rahman, Fernando Putra Silalahi, Rahmat Yasirandi, Muhammad Al Makky, Noor Alamsyah, Walid Hanif Ataullah",
    role: "6th Author",
    indexing: "Scopus",
    tags: ["Zoo Health", "Mobile App", "Animal Health Monitoring"],
    link: "https://ieeexplore.ieee.org/abstract/document/11290765/",
  },
  {
    title: "Design and Implementation of Real-Time Monitoring System for Bird Tracking Applications",
    year: "2025",
    journal: "ICSECS 2025",
    publisher: "IEEE",
    authors: "Jonathan Arya Wibowo, Muharman Lubis, Rio Guntur Utomo, Walid Hanif Ataullah, Sheina Fathur Rahman, Isa Mulia Insan",
    role: "4th Author",
    indexing: "Scopus",
    tags: ["GPS Tracking", "Bird Monitoring", "GSM Module"],
    link: "https://ieeexplore.ieee.org/abstract/document/11279236",
  },
  {
    title: "Performance and Reliability Analysis of 4G-Based Flight Controllers in UAV Control",
    year: "2025",
    journal: "ICCTEIE 2025",
    publisher: "IEEE",
    authors: "Riska Yucha Septiyanti, Rendy Munadi, Basuki Rahmat, Walid Hanif Ataullah, Athif Fadheel Atharahman, Jonathan Arya Wibowo",
    role: "4th Author",
    indexing: "Scopus",
    tags: ["4G LTE", "UAV", "MAVLink", "Latency Analysis"],
    link: "https://ieeexplore.ieee.org/abstract/document/11341803",
  },
  {
    title: "Multi-Purpose Security Camera for E-Cigarette Smoke Detection With Semantic Segmentation",
    year: "2024",
    journal: "ICOIACT 2024",
    publisher: "IEEE",
    authors: "Walid Hanif Ataullah, Aji Gautama Putrada, Villy Satria Praditha",
    role: "1st Author & Presenter",
    indexing: "Scopus",
    tags: ["DeepLabV3", "MobileNetV2", "Smoke Detection", "AUC 0.90"],
    link: "https://ieeexplore.ieee.org/abstract/document/10913184",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
      {/* Newspaper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLy4KPC9zdmc+')] bg-repeat" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Newspaper Masthead Style */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-10"
        >
          {/* Category tag */}
          <div className="inline-block mb-2 sm:mb-3">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase bg-[#DA291C] text-white px-2 sm:px-3 py-1">
              Research Publications
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              PUSHING THE BOUNDARIES OF
              <br />
              <span className="text-[#DA291C]">KNOWLEDGE</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Scientific Research</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>AI & Machine Learning</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Information Systems</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Publications List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Main headline */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-black text-black mb-2 leading-tight">
              Contributing to scientific knowledge through interdisciplinary research in AI, machine learning, and information systems
            </h3>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-4 sm:mb-6">
              <span>By Research Desk</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Publications Section</span>
            </div>

            {/* Publications List */}
            <div className="space-y-3 sm:space-y-4">
              {publications.map((pub, index) => (
                <motion.article
                  key={pub.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="border-2 border-black p-3 sm:p-4 lg:p-5 bg-white relative hover:border-[#DA291C] transition-colors">
                    {/* Red accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#DA291C]" />

                    {/* Article number */}
                    <div className="absolute top-2 right-2 font-serif text-3xl sm:text-5xl font-black text-[#DA291C]/10 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="font-serif text-xl sm:text-2xl font-black text-[#DA291C]">
                        {pub.year}
                      </span>
                      <span className="w-6 sm:w-8 h-px bg-[#DA291C]" />
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#666]">
                        {pub.publisher}
                      </span>
                      {pub.indexing && (
                        <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-wider uppercase bg-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1">
                          {pub.indexing}
                        </span>
                      )}
                      {pub.role && (
                        <span className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-wider uppercase border border-[#ddd] text-[#666] px-1.5 sm:px-2 py-0.5 sm:py-1">
                          {pub.role}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-sm sm:text-base lg:text-lg font-black text-black leading-tight mb-1 sm:mb-2 pr-10 sm:pr-12">
                      {pub.title}
                    </h4>

                    {/* Journal */}
                    <p className="font-serif text-[10px] xs:text-xs text-[#444] mb-1 sm:mb-2 italic">
                      {pub.journal}
                    </p>

                    {/* Authors */}
                    <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-[#666] mb-2 sm:mb-3">
                      {pub.authors}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[7px] xs:text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 border border-[#ddd] text-[#444] hover:border-[#DA291C] hover:text-[#DA291C] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[#DA291C] hover:text-black transition-colors font-bold"
                      >
                        View Publication
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-4 mt-8 lg:mt-0"
          >
            {/* Publication Stats */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Research Summary
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">8</p>
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999] mt-1">
                    Publications
                  </p>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4 grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">7</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Scopus</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">1</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">SINTA 3</p>
                  </div>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">3</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">1st Author</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Areas */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Research Focus Areas
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  "Pose Recognition & Action Detection",
                  "Semantic Segmentation",
                  "UAV Technology & Control Systems",
                  "IoT Monitoring Solutions",
                  "Design Thinking & UX Research",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#DA291C] font-serif">•</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mt-4 sm:mt-6 border border-[#ddd] p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black mb-2 sm:mb-3">
                Technologies & Methods
              </h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {["MediaPipe", "LSTM", "DeepLabV3", "MobileNet", "MAVLink", "GPS", "Agile Scrum"].map((tech, i) => (
                  <span key={i} className="text-[7px] xs:text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#f5f3f0] text-[#444]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Research Philosophy Quote */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="text-[9px] xs:text-[10px] tracking-widest uppercase text-[#DA291C] mb-1 sm:mb-2">
                Research Philosophy
              </p>
              <p className="font-serif text-[13px] sm:text-sm italic text-[#333] leading-relaxed">
                &ldquo;I believe in conducting research that bridges theoretical
                frameworks with practical applications, focusing on understanding
                technology adoption in diverse contexts and leveraging AI and IoT
                to address real-world challenges.&rdquo;
              </p>
            </div>

            {/* Conference Types */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-[#ddd]">
              <h4 className="text-[9px] xs:text-[10px] tracking-widest uppercase font-bold text-black mb-2">
                Publication Venues
              </h4>
              <div className="space-y-2">
                {[
                  { name: "IEEE Xplore", count: "7 papers" },
                  { name: "IJoICT Journal", count: "1 paper" },
                ].map((venue, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-serif text-[13px] sm:text-sm text-black">{venue.name}</span>
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#DA291C]">{venue.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section - Decorative line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-16 border-t-4 border-black pt-4 sm:pt-6"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="w-16 sm:w-20 h-px bg-[#999]" />
            <span className="text-[#DA291C] text-xl sm:text-2xl font-serif">&diams;</span>
            <span className="w-16 sm:w-20 h-px bg-[#999]" />
          </div>
        </motion.div>

        {/* Edition footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-3 sm:mt-4 text-center"
        >
          <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-[#666]">
            End of Section &bull; Publications &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}