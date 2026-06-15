"use client";

import { motion } from "framer-motion";

const volunteerExperiences = [
  {
    organization: "Al-Fath Telkom University",
    role: "Head of Public Relations Division",
    event: "Twilight Spectrum Festival",
    period: "Aug 2023 – Dec 2023",
    type: "Event",
    responsibilities: [
      "Managed external communications and promotional strategies",
      "Coordinated stakeholder engagement to enhance event visibility and participation",
    ],
    accentColor: "#DA291C",
  },
  {
    organization: "Bidikmisi Student Forum, Telkom University",
    role: "Chief Organizer",
    event: "Journal of Training for Internal Scholarship Students",
    period: "Dec 2022 – Jan 2023",
    type: "Event",
    responsibilities: [
      "Led planning and execution of academic writing training for scholarship recipients",
      "Coordinated speakers, participants, and program activities",
    ],
    accentColor: "#DA291C",
  },
  {
    organization: "SMAN 5 Kabupaten Tangerang",
    role: "Head of Scientific Research Club",
    event: "Kelompok Ilmiah Remaja (KIR)",
    period: "Nov 2019 – Oct 2020",
    type: "Organization",
    responsibilities: [
      "Led student research activities and scientific discussions",
      "Promoted academic curiosity through research-based programs and collaborative learning",
    ],
    accentColor: "#DA291C",
  },
  {
    organization: "SMAN 5 Kabupaten Tangerang",
    role: "Head of Skills & Entrepreneurship Division",
    event: "Student Council (OSIS)",
    period: "Nov 2019 – Oct 2020",
    type: "Organization",
    responsibilities: [
      "Organized skill development and entrepreneurship programs for students",
      "Fostered creativity, leadership, and practical skills through structured initiatives",
    ],
    accentColor: "#DA291C",
  },
];

export default function Volunteer() {
  return (
    <section id="volunteer" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              Leadership & Community
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              LEADING WITH
              <br />
              <span className="text-[#DA291C]">PURPOSE</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Community Engagement</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Team Leadership</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Organizational Skills</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Volunteer Experiences */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Main headline */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-black text-black mb-2 leading-tight">
              Leadership roles in organizations and events that shaped my journey in community engagement and teamwork
            </h3>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-4 sm:mb-6">
              <span>By Community Desk</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Volunteer Section</span>
            </div>

            {/* Volunteer experiences grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {volunteerExperiences.map((vol, index) => (
                <motion.article
                  key={`${vol.organization}-${vol.role}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="border-2 border-black p-3 sm:p-4 bg-white relative hover:border-[#DA291C] transition-colors h-full">
                    {/* Red accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#DA291C]" />

                    {/* Article number */}
                    <div className="absolute top-2 right-2 font-serif text-3xl sm:text-4xl font-black text-[#DA291C]/10 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                      <span className="text-[8px] xs:text-[9px] tracking-widest uppercase text-[#DA291C] font-bold">
                        {vol.period}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#999]" />
                      <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-bold tracking-wider uppercase bg-black text-white px-1.5 sm:px-2 py-0.5">
                        {vol.type}
                      </span>
                    </div>

                    {/* Role */}
                    <h4 className="font-serif text-sm sm:text-base font-black text-black leading-tight mb-1 pr-10">
                      {vol.role}
                    </h4>

                    {/* Organization */}
                    <p className="font-serif text-[13px] sm:text-sm text-[#333] font-semibold mb-1">
                      {vol.organization}
                    </p>

                    {/* Event */}
                    <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#666] mb-2 sm:mb-3">
                      {vol.event}
                    </p>

                    {/* Responsibilities */}
                    <div className="space-y-1">
                      {vol.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#DA291C] font-serif text-sm">•</span>
                          <p className="text-[10px] xs:text-[11px] text-[#444] leading-relaxed">
                            {resp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Leadership Philosophy */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="font-serif text-[13px] sm:text-sm text-[#333] leading-relaxed">
                Believing that true leadership is about empowering others and creating meaningful impact through collaboration and community engagement.
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
            {/* Leadership Stats */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Leadership Summary
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">4</p>
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999] mt-1">
                    Leadership Roles
                  </p>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4 grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">2</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Events</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">2</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Organizations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Areas */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Leadership Competencies
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  "Public Relations & Communications",
                  "Event Planning & Execution",
                  "Team Coordination & Management",
                  "Academic Mentorship",
                  "Strategic Planning",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#DA291C] font-serif">•</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
            <div className="mt-4 sm:mt-6 border border-[#ddd] p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black mb-2 sm:mb-3">
                Organizations Served
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { org: "Al-Fath Telkom University", type: "University" },
                  { org: "Bidikmisi Student Forum", type: "University" },
                  { org: "SMAN 5 Kabupaten Tangerang", type: "High School" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-serif text-[13px] sm:text-sm text-black">{item.org}</span>
                    <span className="text-[8px] xs:text-[9px] sm:text-[9px] text-[#DA291C]">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="text-[9px] xs:text-[10px] tracking-widest uppercase text-[#DA291C] mb-2">
                Service Timeline
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                  <span className="font-serif text-[13px] sm:text-sm text-black">2019</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666]">High School Leadership</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                  <span className="font-serif text-[13px] sm:text-sm text-black">2022</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666]">University Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                  <span className="font-serif text-[13px] sm:text-sm text-black">2023</span>
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#666]">PR Division Head</span>
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
            End of Section &bull; Volunteer &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}