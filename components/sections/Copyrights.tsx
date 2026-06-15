"use client";

import { motion } from "framer-motion";

const copyrights = [
  {
    title: "Palm Oil Machine Analytics Dashboard Application",
    registrationNo: "001083032",
    date: "30 Dec 2025",
    organization: "Directorate General of Intellectual Property (DGIP), Indonesia",
    role: "Co-creator",
  },
  {
    title: "Barista Schedule Management System (Jadwal.in)",
    registrationNo: "000928976",
    date: "8 Jul 2025",
    organization: "Directorate General of Intellectual Property (DGIP), Indonesia",
    role: "Co-creator",
  },
  {
    title: "Attendance System (Hadir.In)",
    registrationNo: "000925259",
    date: "10 Jun 2025",
    organization: "Directorate General of Intellectual Property (DGIP), Indonesia",
    role: "Co-creator",
  },
];

export default function Copyrights() {
  return (
    <section id="copyrights" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              Intellectual Property
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              PROTECTING
              <br />
              <span className="text-[#DA291C]">INNOVATION</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Intellectual Property</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Official Registration</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Innovation Rights</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Copyrights List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Main headline */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-black text-black mb-2 leading-tight">
              Officially registered intellectual property contributions through the Directorate General of Intellectual Property, Indonesia
            </h3>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-4 sm:mb-6">
              <span>By Legal Desk</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Copyrights Section</span>
            </div>

            {/* Copyrights List */}
            <div className="space-y-3 sm:space-y-4">
              {copyrights.map((copyright, index) => (
                <motion.article
                  key={copyright.registrationNo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
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
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#DA291C] font-bold">
                        {copyright.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#999]" />
                      <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-wider uppercase bg-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1">
                        {copyright.role}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-sm sm:text-lg lg:text-xl font-black text-black leading-tight mb-1 sm:mb-2 pr-10 sm:pr-12">
                      {copyright.title}
                    </h4>

                    {/* Organization */}
                    <p className="font-serif text-[13px] sm:text-sm text-[#444] mb-2 sm:mb-3">
                      {copyright.organization}
                    </p>

                    {/* Registration Number */}
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#666]">
                        Registration No.
                      </span>
                      <span className="font-serif text-[13px] sm:text-sm font-bold text-black">
                        {copyright.registrationNo}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Official Notice */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="font-serif text-[13px] sm:text-sm text-[#333] leading-relaxed">
                All intellectual property rights are officially registered and protected under Indonesian law through the{" "}
                <span className="font-bold">Directorate General of Intellectual Property (DGIP)</span>, Ministry of Law and Human Rights, Republic of Indonesia.
              </p>
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
            {/* Copyright Stats */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                IP Registry Summary
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">3</p>
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999] mt-1">
                    Registered Copyrights
                  </p>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4 grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">3</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Co-creator</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">2025</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protected Areas */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Protected Categories
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  "Software Applications",
                  "Dashboard Systems",
                  "Management Platforms",
                  "Analytics Tools",
                  "Web Apps",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#DA291C] font-serif">•</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Framework */}
            <div className="mt-4 sm:mt-6 border border-[#ddd] p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black mb-2 sm:mb-3">
                Legal Framework
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <p className="font-serif text-[13px] sm:text-sm text-black font-semibold">
                  Law No. 28 of 2014
                </p>
                <p className="font-serif text-[11px] sm:text-xs text-[#444] leading-relaxed">
                  Copyright protection in Indonesia is governed by the Law on Copyright, providing legal recognition and protection for creators and intellectual property owners.
                </p>
              </div>
            </div>

            {/* Application Types */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="text-[9px] xs:text-[10px] tracking-widest uppercase text-[#DA291C] mb-2">
                Application Domains
              </p>
              <div className="space-y-2">
                {[
                  { domain: "Agriculture", desc: "Palm Oil Analytics" },
                  { domain: "Food & Beverage", desc: "Barista Scheduling" },
                  { domain: "HR & Administration", desc: "Attendance System" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-serif text-[13px] sm:text-sm font-bold text-black">{item.domain}</p>
                    <p className="text-[9px] xs:text-[10px] sm:text-[11px] text-[#666]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Timeline */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-[#ddd]">
              <h4 className="text-[9px] xs:text-[10px] tracking-widest uppercase font-bold text-black mb-2 sm:mb-3">
                Registration Timeline
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                  <span className="font-serif text-[11px] sm:text-xs text-black">Jun 2025</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666]">Hadir.In</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                  <span className="font-serif text-[11px] sm:text-xs text-black">Jul 2025</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666]">Jadwal.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                  <span className="font-serif text-[11px] sm:text-xs text-black">Dec 2025</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666]">Palm Oil Dashboard</span>
                </div>
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
            End of Section &bull; Copyrights &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}
