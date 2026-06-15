"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "APJ Gate",
    date: "14 Apr 2026 – 23 Apr 2026",
    description: "A web-based monitoring and management system for public street lighting, designed to support operational control, energy optimization, and maintenance efficiency.",
    responsibilities: [
      "Designed and developed the executive energy audit feature using Angular and Serverless Framework (Node.js) to analyze energy consumption, cost efficiency, and environmental impact",
      "Implemented calculation logic for technical analysis & efficiency, investment and TCOO (12 year), and environmental impact (ESG) metrics",
    ],
    technologies: ["Angular", "Node.js", "Serverless"],
    link: "https://console-dev.stroomer.co.id/sign-in",
  },
  {
    title: "Prabayar Pintar (Prapin)",
    date: "1 Apr 2026 – 3 May 2026",
    description: "A mobile-based application designed to monitor, manage, and optimize household electricity usage through real-time tracking, smart device integration, and seamless token top-up functionality.",
    responsibilities: [
      "Enhanced a mobile-based energy management system using Flutter with RESTful API integration by restructuring the device onboarding workflow",
      "Enhanced the manual top-up feature into an interactive Your Meter utility",
      "Implemented IoT device connectivity features including Bluetooth pairing, Wi-Fi configuration, and handshaking protocols",
    ],
    technologies: ["Flutter", "REST API", "IoT", "Bluetooth", "OpenWeather API"],
    link: "https://play.google.com/store/apps/details?id=id.co.stroomer.mobile",
  },
  {
    title: "Transformer Advanced Commissioning (Trafacomm)",
    date: "24 Dec 2025 – 30 Mar 2026",
    description: "A mobile-based application designed to support transformer monitoring, tracking, and installation activities in the field through structured and integrated workflows for asset management.",
    responsibilities: [
      "Developed a mobile frontend using Flutter with RESTful API integration to support real-time transformer monitoring and field operations",
      "Implemented structured workflows for transformer installation, configuration, and real-time monitoring",
    ],
    technologies: ["Flutter", "REST API", "Asset Management"],
    link: "https://play.google.com/store/apps/details?id=id.stroomer.trafacomm.up3",
  },
  {
    title: "GPS Tracker",
    date: "5 Feb 2026 – 25 Feb 2026",
    description: "A web-based dashboard designed to monitor and track device locations in real-time, allowing users to manage multiple devices, view location history, and filter tracking data.",
    responsibilities: [
      "Designed and developed a web-based GPS tracking system using Serverless Framework (Node.js) and Angular",
      "Implemented real-time location tracking, multi-device monitoring, and historical data filtering",
    ],
    technologies: ["Angular", "Node.js", "Serverless", "GPS"],
    link: "https://gpstracker.stroomer.co.id",
  },
  {
    title: "Stroomer Company Website",
    date: "16 Dec 2025 – 23 Dec 2025",
    description: "A web-based corporate website designed to promote company services and provide information about products, solutions, company profiles, contact, and career opportunities.",
    responsibilities: [
      "Enhanced contact form features using Astro, Serverless Framework (Node.js), and Sanity CMS",
      "Designed and developed recruitment features including job listings and career pages",
      "Implemented job application workflows including CV upload and email automation",
    ],
    technologies: ["Astro", "Node.js", "Sanity CMS", "Nodemailer"],
    link: "https://stroomer.co.id",
  },
  {
    title: "Palm Oil Machine Analytics Dashboard",
    date: "12 Jan 2025 – 22 Aug 2025",
    description: "A web-based analytics dashboard designed for real-time and historical monitoring of palm oil processing machines, integrating computer vision to analyze operational parameters.",
    responsibilities: [
      "Designed and developed a real-time analytics dashboard using Laravel with computer vision integration",
      "Implemented monitoring of machine parameters through data ingestion and visualization to support anomaly detection",
    ],
    technologies: ["Laravel", "Computer Vision", "MySQL"],
    link: "https://jurnalptpn.teluapp.org",
  },
  {
    title: "E-Laman Hati",
    date: "25 May 2025 – 25 Jul 2025",
    description: "A mobile-based digital platform developed in collaboration with DKPP Bandung City to support animal health data management, including registration, monitoring, vaccination tracking, and public reporting.",
    responsibilities: [
      "Led redevelopment of a mobile animal health management system, coordinating a student development team using Agile Scrum methodology",
      "Implemented animal health registration, monitoring, and reporting features",
    ],
    technologies: ["Flutter", "Agile Scrum", "Mobile"],
    link: "https://bit.ly/e-lamanhatiapk",
  },
  {
    title: "Kacir FnB",
    date: "20 May 2025 – 20 Jul 2025",
    description: "A mobile-based point-of-sale (POS) application designed to streamline sales transactions, payment processing, and business operations, featuring integrated reporting and multi-outlet management.",
    responsibilities: [
      "Led the development of a mobile POS system, coordinating a student development team using Agile Scrum methodology",
      "Implemented transaction processing, sales reporting, and multi-outlet management features",
    ],
    technologies: ["Flutter", "Agile Scrum", "POS"],
    link: "https://bit.ly/kacirfnbapk",
  },
  {
    title: "Attendance System (Hadir.In)",
    date: "13 May 2025 – 10 Jun 2025",
    description: "A web-based platform designed to streamline meeting and attendance management within organizations, enabling form submission, attendance tracking, and real-time participation monitoring.",
    responsibilities: [
      "Enhanced a web-based attendance management system using Laravel and MySQL",
      "Implemented configurable forms and automated PDF reporting",
    ],
    technologies: ["Laravel", "MySQL", "PDF"],
    link: "https://hadirin.teluapp.org/login",
  },
  {
    title: "DKPP Store",
    date: "12 Mar 2025 – 20 Apr 2025",
    description: "A web-based application portal developed for DKPP Bandung City to manage, distribute, and showcase digital innovation solutions in agriculture and food security.",
    responsibilities: [
      "Designed and developed a web-based application portal using Laravel and MySQL",
      "Implemented centralized access for public and stakeholders to explore agricultural and food security applications",
    ],
    technologies: ["Laravel", "MySQL"],
    link: "https://dkpp-store.teluapp.org",
  },
  {
    title: "E-Buruan Sae Dashboard",
    date: "28 Dec 2024 – 6 Mar 2025",
    description: "A web-based dashboard developed for DKPP Bandung City to manage agricultural data, including harvest recording, prediction, and distribution tracking for urban farming programs.",
    responsibilities: [
      "Enhanced a web-based dashboard using CodeIgniter and MySQL for agricultural data management",
      "Implemented harvest prediction and distribution tracking features",
    ],
    technologies: ["CodeIgniter", "MySQL", "Prediction"],
    link: "https://buruansae-dashboard.matradipti.org/login",
  },
  {
    title: "Barista Schedule Management (Jadwal.in)",
    date: "16 Sep 2024 – 8 Jan 2025",
    description: "A web-based scheduling system designed for multi-outlet workforce management, enabling flexible shift planning, approval workflows, and real-time coordination.",
    responsibilities: [
      "Designed and developed a web-based scheduling system using Laravel and MySQL for multi-outlet workforce management",
      "Implemented real-time shift coordination and improved workforce planning efficiency",
    ],
    technologies: ["Laravel", "MySQL", "Scheduling"],
    link: "https://shift.matradipti.org",
  },
  {
    title: "Non-ASN Employee Management (SIMONA)",
    date: "15 Jul 2024 – 30 Aug 2024",
    description: "A web-based employee management system developed for local government in Tangerang Regency to manage non-civil servant (Non-ASN) workforce data.",
    responsibilities: [
      "Designed and developed a web-based employee management system using Laravel and MySQL",
      "Implemented employee data and profile management features to improve administrative efficiency",
    ],
    technologies: ["Laravel", "MySQL", "Employee Management"],
    link: "https://simona.tangerangkab.my.id/panel",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-10 sm:py-16 overflow-hidden bg-[#FAF8F5]">
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
              Portfolio of Works
            </span>
          </div>

          {/* Section title */}
          <div className="border-b-4 border-black pb-2 sm:pb-3">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              BUILDING SOLUTIONS
              <br />
              <span className="text-[#DA291C]">THAT MATTER</span>
            </h2>
          </div>

          {/* Subheader */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] xs:text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[#666] mt-2 sm:mt-3">
            <span>Technical Innovation</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Real-World Applications</span>
            <span className="w-1 h-1 rounded-full bg-[#DA291C] shrink-0" />
            <span>Research-Driven</span>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - Projects Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            {/* Main headline */}
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-black text-black mb-2 leading-tight">
              Technical work solving real-world problems through innovation, research, and practical applications
            </h3>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[9px] xs:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#666] border-b border-dashed border-[#999] pb-2 sm:pb-3 mb-4 sm:mb-6">
              <span>By Projects Desk</span>
              <span className="w-1 h-1 rounded-full bg-[#DA291C]" />
              <span>Portfolio Section</span>
            </div>

            {/* Projects Grid - 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="border-2 border-black p-3 sm:p-4 bg-white relative hover:border-[#DA291C] transition-colors h-full flex flex-col">
                    {/* Red accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#DA291C]" />

                    {/* Article number */}
                    <div className="absolute top-2 right-2 font-serif text-3xl sm:text-4xl font-black text-[#DA291C]/10 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Date */}
                    <p className="text-[8px] xs:text-[9px] tracking-widest uppercase text-[#666] mb-1 sm:mb-2">
                      {project.date}
                    </p>

                    {/* Title */}
                    <h4 className="font-serif text-sm sm:text-base font-black text-black leading-tight mb-1 sm:mb-2 pr-10">
                      {project.title}
                    </h4>

                    {/* Description */}
                    <p className="font-serif text-[10px] xs:text-xs text-[#444] leading-relaxed mb-2 sm:mb-3 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Key Responsibilities */}
                    {project.responsibilities && (
                      <div className="mb-2 sm:mb-3 space-y-1">
                        <span className="text-[8px] xs:text-[9px] text-[#DA291C] uppercase tracking-wider font-bold">
                          Key Responsibilities
                        </span>
                        <ul className="space-y-1">
                          {project.responsibilities.slice(0, 2).map((resp, i) => (
                            <li key={i} className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#555] leading-relaxed pl-2 border-l border-[#ddd]">
                              {resp.length > 60 ? resp.substring(0, 60) + "..." : resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 mt-auto">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[7px] xs:text-[8px] px-1.5 sm:px-2 py-0.5 border border-[#ddd] text-[#444]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-[#DA291C] hover:text-black transition-colors font-bold mt-auto"
                      >
                        View Project
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {/* Project Stats */}
            <div className="bg-black text-white p-4 sm:p-6 mb-4 sm:mb-6">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#999] mb-3 sm:mb-4 pb-2 border-b border-[#333]">
                Project Summary
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl font-black text-[#DA291C]">13</p>
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] tracking-widest uppercase text-[#999] mt-1">
                    Total Projects
                  </p>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">9</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Web Apps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">4</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Mobile Apps</p>
                  </div>
                </div>
                <div className="border-t border-[#333] pt-3 sm:pt-4 grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">11</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Developer</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-white">2</p>
                    <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase text-[#666]">Project Manager</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="border-2 border-black p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black border-b-2 border-black pb-1 sm:pb-2 mb-3 sm:mb-4">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {["Flutter", "Angular", "Laravel", "CodeIgniter", "Astro", "Node.js", "MySQL", "IoT", "GPS", "Computer Vision"].map((tech, i) => (
                  <span key={i} className="text-[7px] xs:text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#f5f3f0] text-[#444]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Categories */}
            <div className="mt-4 sm:mt-6 border border-[#ddd] p-4 sm:p-5">
              <h4 className="text-[9px] xs:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-black mb-2 sm:mb-3">
                Project Categories
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  { cat: "Energy & Utilities", count: "3 projects" },
                  { cat: "Agriculture & Food", count: "3 projects" },
                  { cat: "Government & Admin", count: "3 projects" },
                  { cat: "Fleet & Tracking", count: "2 projects" },
                  { cat: "Corporate Solutions", count: "2 projects" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="font-serif text-[13px] sm:text-sm text-black">{item.cat}</span>
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-[#DA291C]">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Project */}
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-[#f5f3f0] border-l-4 border-[#DA291C]">
              <p className="text-[9px] xs:text-[10px] tracking-widest uppercase text-[#DA291C] mb-1 sm:mb-2">
                Latest Project
              </p>
              <p className="font-serif text-sm sm:text-base font-black text-black mb-1">
                Prabayar Pintar (Prapin)
              </p>
              <p className="font-serif text-[11px] sm:text-xs text-[#444] leading-relaxed">
                Mobile-based household electricity monitoring with IoT integration, Bluetooth pairing, and smart device connectivity.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-[#ddd]">
              <h4 className="text-[9px] xs:text-[10px] tracking-widest uppercase font-bold text-black mb-2 sm:mb-3">
                Timeline Coverage
              </h4>
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl sm:text-2xl font-black text-black">2024</span>
                <span className="text-[#DA291C] font-serif text-lg sm:text-xl">—</span>
                <span className="font-serif text-xl sm:text-2xl font-black text-black">2026</span>
              </div>
              <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-center tracking-widest uppercase text-[#666] mt-1">
                2+ Years of Experience
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
            End of Section &bull; Projects &bull; Vol. MMXXVI
          </p>
        </motion.div>
      </div>
    </section>
  );
}