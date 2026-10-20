import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Rocket,
  Star,
  Calendar,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const ProjectsPage = ({ onNavigate }) => {
  const projectsRef = useRef(null);
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const isInView = useInView(projectsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView || reduceMotion) controls.start("visible");
  }, [controls, isInView, reduceMotion]);

  const containerVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: reduceMotion ? 0 : 0.12, staggerChildren: reduceMotion ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: reduceMotion ? 0 : 24, opacity: reduceMotion ? 1 : 0 },
    visible: { y: 0, opacity: 1, transition: { duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] } },
  };

  const projects = [
    {
      title: "CNC Market",
      description:
        "A full-stack digital marketplace where users can browse, purchase, and securely download CNC design files. Features include Razorpay payment integration, protected file delivery, Cloudinary previews, and Cloudflare R2 storage.",
      tech: ["Next.js", "Node.js", "Cloudflare R2", "Razorpay", "Cloudinary"],
      image: "bg-gradient-to-br from-cyan-500 to-violet-600",
      github: null,
      demo: "https://cncmarket.in",
      status: "Completed",
      featured: true,
      gradient: "from-cyan-500 to-violet-600",
    },
    {
      title: "SchemaFlow",
      description:
        "A web application for parsing and visualizing database schemas through an interactive, component-driven interface. Built with a Next.js App Router, Dockerized deployment architecture, and responsive UI.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Docker"],
      image: "bg-gradient-to-br from-blue-500 to-indigo-600",
      github: "https://github.com/Aaditya-kumar-singh/SchemaFlow",
      demo: "https://schemaflow.pages.dev",
      status: "Completed",
      featured: true,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Typing Test Website",
      description:
        "A real-time typing platform designed to measure typing speed and accuracy while supporting competitive multiplayer typing experiences using WebSockets, leaderboards, and JWT authentication.",
      tech: ["React", "Vite", "Node.js", "MongoDB", "Socket.io"],
      image: "/TypingTest.png",
      github: "https://github.com/Aaditya-kumar-singh/TypingTestWebsite",
      demo: null,
      status: "In Progress",
      featured: true,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "RudraShield Pest Management",
      description:
        "A business website developed for RudraShield Pest Management to establish its online presence, showcase its pest-management services, and connect clients with service bookings.",
      tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
      image: "bg-gradient-to-br from-emerald-500 to-teal-600",
      github: null,
      demo: "https://www.rudrashieldpestmanagement.in/",
      status: "Completed",
      featured: false,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Todo App",
      description:
        "A full-stack task management application featuring JWT-based authorization, CRUD operations, real-time updates, task categorization, and persistent storage.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      image: "/ToDoApp.png",
      github: "https://github.com/Aaditya-kumar-singh/TodoApp",
      demo: "https://radiant-rabanadas-8eec6b.netlify.app/",
      status: "Completed",
      featured: false,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "CLI Web Vulnerability Scanner",
      description:
        "A command-line web security scanner designed to identify common web application vulnerabilities (like SQL injection and XSS), perform directory crawling, and run security header analysis.",
      tech: ["Python", "Web Crawling", "Security Headers", "Vulnerability Auditing"],
      image: "bg-gradient-to-br from-violet-600 to-rose-800",
      github: null,
      demo: null,
      status: "Completed",
      featured: false,
      gradient: "from-violet-600 to-rose-800",
    },
  ];

  return (
    <div
      ref={projectsRef}
      className="projects-page-redesign min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm mb-6"
          >
            <Rocket size={16} className="mr-2" />
            Showcasing my work
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            A collection of projects that showcase my skills in full-stack
            development, UI/UX design, and problem-solving
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className={`project-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300 ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
              whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.22, ease: "easeOut" } }}
              whileTap={reduceMotion ? undefined : { scale: 0.995 }}
            >
              <div className="relative h-48 overflow-hidden">
                {project.image.startsWith("/") ? (
                  <div className="project-media relative h-full">
                    <motion.img
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      whileHover={reduceMotion ? undefined : { scale: 1.035 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className={`h-full ${project.image} flex items-center justify-center relative`}>
                    <div className="project-placeholder-mark" aria-hidden="true">
                      <Code size={42} className="text-white/90" />
                      <span>PROJECT PREVIEW</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${project.status === "Completed" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"}`}>
                    {project.status === "Completed" ? "✓ Completed" : "⚡ In Progress"}
                  </span>
                </div>

                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-medium backdrop-blur-sm">
                      <Star size={12} className="inline mr-1" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && <Star size={18} className="text-cyan-400 flex-shrink-0" />}
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600/30">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-lg bg-gray-700/50 text-white hover:bg-gray-700 transition-colors">
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {!project.github && !project.demo && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-lg bg-gray-700/30 text-gray-400">
                      <Eye size={16} />
                      Private / CLI project
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">Want to explore more of my work?</p>
          <motion.button type="button" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.99 }} onClick={() => onNavigate?.("contact")} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-500/30 px-6 py-3 text-cyan-300 hover:bg-cyan-500/10 transition-colors">
            Let&apos;s Connect <ArrowUpRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
