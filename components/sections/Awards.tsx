"use client";

import { motion } from "framer-motion";

const awards = [
  {
    title: "Outstanding Graduate Award",
    organization: "School of Computing, Telkom University",
    date: "21 Oct 2025",
    description:
      "Awarded as the best graduate for outstanding academic and non-academic achievements in Bachelor of Software Engineering.",
    type: "Achievement",
    accentColor: "#DA291C",
  },
  {
    title: "TEKNOFEST 2023 Finalist",
    organization: "TEKNOFEST",
    date: "19 Apr 2023",
    description:
      "Finalist in the International Unmanned Aerial Vehicles Competition, with a search-and-rescue UAV featuring first aid delivery.",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "3rd Place - National English Olympiad",
    organization: "EDSA UNESA & Lembaga Bina Prestasi",
    date: "2 Dec 2023",
    description:
      "Awarded 3rd place in the English category at the Indonesian Youth Language and Spatial Orientation Olympiad, University Level.",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "2nd Place - National Poster Competition",
    organization: "PUSDIMA FIS UNJ",
    date: "20 Nov 2022",
    description:
      "Awarded 2nd place in the Poster category at the National Public Discussion Competition with poster titled \"Langkah Pemilih Pemula Melawan Politik Uang Dalam Pemilu\".",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "Bronze Medal - Pateron Championship",
    organization: "Pateron Indonesia",
    date: "10 Oct 2022",
    description:
      "Awarded Bronze Medal in the Mathematics category at the Pateron Championship Competition Premiere, University Level.",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "Top 200 Teams - Indonesia Digital Tribe",
    organization: "Indonesia Digital Tribe (IDT)",
    date: "4 Apr 2022",
    description:
      "Selected as part of the Top 200 Teams in the national digital innovation program, with a calorie and protein calculator application.",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "2nd Place - Antar Bangsa Competition",
    organization: "STMIK Antar Bangsa",
    date: "15 Mar 2021",
    description:
      "Awarded 2nd place in the Mathematics category at the Inter-Nation Competition, Senior High School Level.",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "3rd Place - Indonesian Student Olympic League",
    organization: "Club Olimpiade & FMIPA USU",
    date: "7 Jun 2020",
    description:
      "Awarded 3rd place in the Physics category at the 14th Indonesian Student Olympic League, Senior High School Level.",
    type: "Competition",
    accentColor: "#DA291C",
  },
  {
    title: "Finalist - Nuclear Smart Competition",
    organization: "STTN-BATAN",
    date: "10 Nov 2019",
    description:
      "Finalist in the Olympiad category at the Nuclear Smart Competition (NSC 2019), Senior High School Level.",
    type: "Competition",
    accentColor: "#DA291C",
  },
];

export default function Awards() {
  return (
    <section id="awards" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              Hall of Fame
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              RECOGNITION OF
              <br />
              <span className="text-[#DA291C]">EXCELLENCE</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Academic Achievements</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Competition Wins</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>National Recognition</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Awards Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Main headline */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-black text-black mb-2 leading-tight">
              Honoring achievements in competitions, research, and academic excellence throughout my journey
            </h3>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-4 sm:mb-6">
              <span>By Awards Desk</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Achievement Section</span>
            </div>

            {/* Awards Grid - Newspaper style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {awards.map((award, index) => (
                <motion.article
                  key={award.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="border-2 border-black p-3 sm:p-4 bg-white relative hover:border-[#DA291C] transition-colors h-full">
                    {/* Red accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#DA291C]" />

                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                      <span className="text-[8px] xs:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1">
                        {award.type}
                      </span>
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666] uppercase tracking-wider">
                        {award.date}
                      </span>
                    </div>

                    {/* Article number */}
                    <div className="absolute top-2 right-2 font-serif text-3xl sm:text-5xl font-black text-[#DA291C]/10 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-sm sm:text-base font-black text-black leading-tight mb-1 sm:mb-2 pr-10 sm:pr-12">
                      {award.title}
                    </h4>

                    {/* Organization */}
                    <p className="text-[9px] xs:text-[10px] sm:text-[11px] tracking-widest uppercase text-[#666] mb-1 sm:mb-2">
                      {award.organization}
                    </p>

                    {/* Description */}
                    <p className="font-serif text-[11px] xs:text-xs text-[#444] leading-relaxed border-l-2 border-[#DA291C] pl-2 sm:pl-3">
                      {award.description}
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
            {/* Achievement Stats */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Achievement Summary
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">9</p>
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999] mt-1">
                    Total Awards
                  </p>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">1</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Achievement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">8</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Competition</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Award Tiers */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Award Categories
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  "National Competitions",
                  "Academic Olympiads",
                  "Innovation Programs",
                  "University Level",
                  "High School Level",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#DA291C] font-serif">•</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notable Achievement */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="text-[9px] xs:text-[10px] tracking-widest uppercase text-[#DA291C] mb-1 sm:mb-2">
                Featured Achievement
              </p>
              <p className="font-serif text-sm sm:text-base font-black text-black mb-1">
                Outstanding Graduate Award
              </p>
              <p className="font-serif text-[13px] sm:text-sm text-[#444] leading-snug">
                Best graduate from School of Computing, Telkom University,
                demonstrating excellence in both academic and non-academic
                achievements.
              </p>
            </div>

            {/* Years Active */}
            <div className="mt-4 sm:mt-6 border border-[#ddd] p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black mb-2 sm:mb-3">
                Years of Achievement
              </h4>
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl sm:text-2xl font-black text-black">2019</span>
                <span className="text-[#DA291C] font-serif text-lg sm:text-xl">—</span>
                <span className="font-serif text-xl sm:text-2xl font-black text-black">2025</span>
              </div>
              <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-center tracking-widest uppercase text-[#666] mt-1">
                6 Years of Excellence
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
            End of Section &bull; Awards &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}