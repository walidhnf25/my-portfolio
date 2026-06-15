"use client";

import { motion } from "framer-motion";

const educationData = [
  {
    institution: "Telkom University",
    location: "Bandung, Indonesia",
    degree: "Bachelor of Software Engineering",
    period: "2021 – 2025",
    description:
      "Focused on Information Technology Adoption, Machine Learning, Deep Learning, and Internet of Things through academic research and intelligent system development projects.",
    badge: "GPA 3.79 · Cum Laude",
    accentColor: "#DA291C",
  },
  {
    institution: "SMAN 5 Kabupaten Tangerang",
    location: "Tangerang, Indonesia",
    degree: "Mathematics& Natural Science",
    period: "2018 – 2021",
    description:
      "Developed strong foundations in mathematics, analytical thinking, and science-oriented problem solving.",
    badge: "Final Grade 86.46",
    accentColor: "#DA291C",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              Academic Records
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              THE JOURNEY OF
              <br />
              <span className="text-[#DA291C]">KNOWLEDGE</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Academic Foundation</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Research & Innovation</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Main headline */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-black text-black mb-2 leading-tight">
              Academic Foundation Shaping My Approach to Technology, Research, and Innovation
            </h3>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-4 sm:mb-6">
              <span>By Academic Records</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Education Section</span>
            </div>

            {/* Education entries */}
            <div className="space-y-6 sm:space-y-8">
              {educationData.map((edu, index) => (
                <motion.article
                  key={edu.institution}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Article number */}
                  <div className="absolute -left-2 sm:-left-4 top-0 font-serif text-4xl sm:text-6xl font-black text-[#DA291C]/10 leading-none">
                    0{index + 1}
                  </div>

                  {/* Card */}
                  <div className="border-2 border-black p-4 sm:p-6 bg-white relative">
                    {/* Red accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#DA291C]" />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-[9px] xs:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#DA291C] mb-1">
                          {edu.period}
                        </p>
                        <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-black text-black leading-tight">
                          {edu.degree}
                        </h4>
                      </div>
                      {/* Badge */}
                      <div className="bg-[#DA291C] text-white px-2 sm:px-3 py-1">
                        <p className="text-[9px] xs:text-[10px] font-bold tracking-wider uppercase">
                          {edu.badge}
                        </p>
                      </div>
                    </div>

                    {/* Institution */}
                    <div className="mb-3 sm:mb-4">
                      <p className="font-serif text-sm sm:text-base text-black font-semibold">
                        {edu.institution}
                      </p>
                      <p className="text-[10px] xs:text-[11px] tracking-widest uppercase text-[#666]">
                        {edu.location}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="font-serif text-[13px] sm:text-sm text-[#444] leading-relaxed border-l-2 border-[#DA291C] pl-3 sm:pl-4">
                      {edu.description}
                    </p>
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
            {/* Academic Highlights */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Academic Highlights
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">3.79</p>
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999] mt-1">
                    GPA Score
                  </p>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#666]">
                      Degree
                    </span>
                    <span className="text-xs sm:text-sm text-white">Cum Laude</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#666]">
                      Duration
                    </span>
                    <span className="text-xs sm:text-sm text-white">4 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Subjects */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Key Focus Areas
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  "Information Technology Adoption",
                  "Machine Learning & Deep Learning",
                  "Internet of Things (IoT)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#DA291C] font-serif">•</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publication note */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="text-[9px] xs:text-[10px] tracking-widest uppercase text-[#DA291C] mb-1">
                Notable Achievement
              </p>
              <p className="font-serif text-[13px] sm:text-sm text-black leading-snug">
                Graduated with Cum Laude honors, demonstrating excellence in
                academic performance and research contributions.
              </p>
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
            End of Section &bull; Education &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}
