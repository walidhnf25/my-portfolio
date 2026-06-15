"use client";

import { motion } from "framer-motion";
import { CodeIcon, AwardIcon, FileBadgeIcon, GraduationCapIcon, TrendingUpIcon } from "@/components/icons";

const stats = [
  { icon: CodeIcon, value: "12+", label: "Projects" },
  { icon: AwardIcon, value: "8+", label: "Awards" },
  { icon: FileBadgeIcon, value: "2+", label: "Copyrights" },
  { icon: GraduationCapIcon, value: "2+", label: "Certifications" },
  { icon: TrendingUpIcon, value: "7+", label: "Publications" },
];

const expertiseAreas = [
  "Information Technology Adoption",
  "Machine Learning",
  "Deep Learning",
  "Internet of Things",
];

export default function About() {
  return (
    <section id="about" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              About the Author
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              THE MAN BEHIND
              <br />
              <span className="text-[#DA291C]">THE INNOVATION</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Software Engineering Graduate</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Research & Development</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>AI Enthusiast</span>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Main Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7"
          >
            {/* Main headline */}
            <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-black text-black mb-3 sm:mb-4 leading-tight">
              Building the Future Through{" "}
              <span className="italic text-[#DA291C]">Intelligent</span>{" "}
              Systems
            </h3>

            {/* Byline */}
            <div className="flex items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-3 sm:mb-4">
              <span>By Editorial Team</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Profile Feature</span>
            </div>

            {/* Main article text with drop cap */}
            <div className="space-y-4">
              <p className="font-serif text-[13px] xs:text-[14px] sm:text-[15px] leading-[1.6] sm:leading-[1.75] text-[#333] first-letter:text-4xl xs:first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2 xs:first-letter:mr-3 first-letter:mt-1 first-letter:text-[#DA291C] first-letter:leading-[0.8]">
                Bachelor&apos;s graduate in Software Engineering with strong
                academic and research experience in AI, machine learning, and
                information systems. Actively contributed to multiple
                Scopus-indexed publications and developed data-driven and
                AI-based solutions through interdisciplinary research and
                real-world projects.
              </p>

              <p className="font-serif text-[13px] xs:text-[14px] sm:text-[15px] leading-[1.6] sm:leading-[1.75] text-[#333]">
                Highly motivated to pursue advanced studies and contribute to
                the development of impactful, technology-driven solutions for
                societal and industrial challenges. Bridging the gap between
                human needs and technological innovation.
              </p>
            </div>

            {/* Pull quote */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="font-serif text-base sm:text-lg italic text-[#333] leading-relaxed">
                &ldquo;Technology is not just about code — it&apos;s about
                solving real problems and creating meaningful impact.&rdquo;
              </p>
            </div>

            {/* Research Interests Section */}
            <div className="mt-8 sm:mt-10">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Research Interests
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {expertiseAreas.map((interest, i) => (
                  <div
                    key={interest}
                    className="flex items-center gap-2 p-2 sm:p-3 border border-[#ddd] hover:border-[#DA291C] hover:bg-[#faf8f5] transition-all duration-200"
                  >
                    <span className="text-[#DA291C] font-serif text-base sm:text-lg">0{i + 1}.</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5 mt-8 lg:mt-0"
          >
            {/* Stats box - Main achievement */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Career Highlights
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.slice(0, 4).map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#DA291C] mx-auto mb-1 sm:mb-2" />
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-white">
                      {stat.value}
                    </p>
                    <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* Featured stat */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#333] text-center">
                <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">
                  {stats[4].value}
                </p>
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-[#999] mt-1">
                  {stats[4].label}
                </p>
              </div>
            </div>

            {/* Expertise box */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Core Competencies
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Software Engineering",
                  "Machine Learning & Deep Learning",
                  "Data-Driven Solutions",
                  "AI-Based Innovation",
                  "Research & Development",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-[#DA291C] font-serif text-lg sm:text-xl">&bull;</span>
                    <span className="font-serif text-[13px] sm:text-sm text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publication highlight */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 border border-[#ddd]">
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-[#DA291C] font-serif text-2xl sm:text-3xl font-black">S</span>
                <div>
                  <p className="text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#DA291C] mb-1">
                    Scopus Indexed
                  </p>
                  <p className="font-serif text-[13px] sm:text-sm text-black leading-snug">
                    Multiple peer-reviewed publications in top-tier academic
                    journals and conferences
                  </p>
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
            End of Feature &bull; About the Author &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}
