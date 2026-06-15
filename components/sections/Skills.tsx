"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    section: "Section I",
    title: "Programming Languages",
    subtitle: "The Foundation",
    skills: ["Python", "Golang", "JavaScript", "PHP", "TypeScript", "SQL", "C", "C++", "C#", "R", "JSON"],
    featured: true,
  },
  {
    section: "Section II",
    title: "Fullstack Development",
    subtitle: "End-to-End Solutions",
    skills: ["Flask", "Node.js", "Laravel", "CodeIgniter", "React", "Angular", "Astro", "Flutter", "MySQL", "PostgreSQL", "MongoDB", "Sanity.io"],
    featured: false,
  },
  {
    section: "Section III",
    title: "Machine & Deep Learning",
    subtitle: "AI & Intelligence",
    skills: ["PyTorch", "TensorFlow", "CNN", "LSTM", "DeepLab", "MobileNet", "Computer Vision", "Semantic Segmentation", "Model Development", "Training", "Evaluation", "Optimization"],
    featured: true,
  },
  {
    section: "Section IV",
    title: "IoT & Intelligent Systems",
    subtitle: "Connected World",
    skills: ["Embedded Programming", "Sensor-Based Data Acquisition", "IoT-Cloud Integration", "Real-Time Monitoring Systems"],
    featured: false,
  },
  {
    section: "Section V",
    title: "Cloud & DevOps",
    subtitle: "Infrastructure",
    skills: ["Google Cloud", "AWS", "Firebase", "Docker", "Git", "Android Studio", "Arduino IDE", "Google Colab", "Jupyter", "Postman"],
    featured: false,
  },
  {
    section: "Section VI",
    title: "Software Engineering",
    subtitle: "Methodology",
    skills: ["Agile", "Scrum", "Kanban", "Waterfall", "Design Thinking", "System Design", "Unit Testing", "Integration Testing", "Performance Testing"],
    featured: true,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              Technical Portfolio
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              THE SKILLS THAT
              <br />
              <span className="text-[#DA291C]">POWER INNOVATION</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Fullstack Development</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Machine Learning</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Software Engineering</span>
          </div>
        </motion.header>

        {/* Introduction paragraph */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-12"
        >
          <p className="font-serif text-[13px] xs:text-[14px] sm:text-[15px] leading-[1.6] sm:leading-[1.75] text-[#333] max-w-4xl first-letter:text-4xl xs:first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2 xs:first-letter:mr-3 first-letter:mt-1 first-letter:text-[#DA291C] first-letter:leading-[0.8]">
            A comprehensive arsenal of technical competencies spanning software development,
            artificial intelligence, and systems engineering. From crafting responsive web applications
            to deploying deep learning models, each skill represents a chapter in the ongoing story
            of technological mastery.
          </p>
        </motion.div>

        {/* Main Skills Grid - Newspaper Column Layout */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Featured Skills (2 large cards) */}
          <div className="col-span-12 lg:col-span-7 space-y-4 sm:space-y-6">
            {skillCategories.filter(s => s.featured).map((category, index) => (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${index === 0 ? 'border-l-2 sm:border-l-4 border-[#DA291C] pl-3 sm:pl-6' : ''}`}
              >
                {index === 0 && (
                  <div className="absolute -top-2 left-0 sm:left-2 bg-[#DA291C] text-white text-[7px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] px-1.5 sm:px-2 py-0.5 sm:py-1">
                    FEATURED
                  </div>
                )}

                <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {/* Section header */}
                  <div className="border-b-2 border-black pb-2 sm:pb-3 mb-3 sm:mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#999]">
                        {category.section}
                      </span>
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-[#DA291C]">
                        {category.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-black text-black mt-1 sm:mt-2">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] xs:text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 sm:py-1.5 bg-[#f5f3f0] border border-[#ddd] text-[#333] font-serif hover:bg-[#DA291C] hover:text-white hover:border-[#DA291C] transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Pull Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 bg-black text-white"
            >
              <p className="font-serif text-base sm:text-lg italic leading-relaxed">
                &ldquo;Mastering technology is not about knowing everything — it&apos;s about
                understanding how to apply the right tools to solve the right problems.&rdquo;
              </p>
              <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#999] mt-2 sm:mt-3">
                — Editorial Philosophy
              </p>
            </motion.div>
          </div>

          {/* Right Column - Secondary Skills (sidebar style) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5 mt-8 lg:mt-0"
          >
            {/* Section header for sidebar */}
            <div className="bg-[#DA291C] text-white p-3 sm:p-4 mb-4 sm:mb-6">
              <h3 className="font-serif text-lg sm:text-xl font-black">
                Additional Expertise
              </h3>
              <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-white/70 mt-1">
                Supporting Competencies
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {skillCategories.filter(s => !s.featured).map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  viewport={{ once: true }}
                  className="border border-[#ddd] p-3 sm:p-4 bg-white hover:border-black transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div>
                      <span className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#999]">
                        {category.section}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-black">
                        {category.title}
                      </h4>
                    </div>
                    <span className="text-[#DA291C] font-serif text-lg sm:text-xl">&bull;</span>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[8px] xs:text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#faf8f5] border border-[#eee] text-[#555] font-serif"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats sidebar box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-4 sm:mt-6 bg-black text-white p-4 sm:p-5"
            >
              <h4 className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Skill Summary
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-[12px] sm:text-sm text-white/80">Programming Languages</span>
                  <span className="font-serif text-base sm:text-lg font-black text-[#DA291C]">11</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-[12px] sm:text-sm text-white/80">Frameworks & Libraries</span>
                  <span className="font-serif text-base sm:text-lg font-black text-[#DA291C]">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-[12px] sm:text-sm text-white/80">AI/ML Specializations</span>
                  <span className="font-serif text-base sm:text-lg font-black text-[#DA291C]">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-[12px] sm:text-sm text-white/80">DevOps & Cloud</span>
                  <span className="font-serif text-base sm:text-lg font-black text-[#DA291C]">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-[12px] sm:text-sm text-white/80">Methodologies</span>
                  <span className="font-serif text-base sm:text-lg font-black text-[#DA291C]">9</span>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#333] text-center">
                <p className="font-serif text-2xl sm:text-3xl font-black text-white">
                  50+
                </p>
                <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-[#999]">
                  Total Technologies
                </p>
              </div>
            </motion.div>
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
            End of Technical Portfolio &bull; Skills Section &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}