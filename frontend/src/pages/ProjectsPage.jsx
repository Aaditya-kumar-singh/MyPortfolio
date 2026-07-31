import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
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
import { gsap } from "gsap";

const ProjectSkeleton = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden relative p-0">
      {/* Image shimmer */}
      <div className="h-48 shimmer" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 w-2/3 shimmer rounded" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full shimmer rounded" />
          <div className="h-4 w-5/6 shimmer rounded" />
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 shimmer rounded-full" />
          <div className="h-6 w-12 shimmer rounded-full" />
          <div className="h-6 w-20 shimmer rounded-full" />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4">
          <div className="flex space-x-4">
            <div className="h-5 w-12 shimmer rounded" />
            <div className="h-5 w-12 shimmer rounded" />
          </div>
          <div className="h-9 w-24 shimmer rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const projectsRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (!isLoading && isInView) {
      // GSAP animation for project cards once loading completes
      gsap.fromTo(
        ".project-card",
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
          rotateX: 15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }
  }, [isInView, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const projects = [
    {
      title: "CNC Market",
      description:
        "A full-stack digital marketplace where users can browse, purchase, and securely download CNC design files. Features include Razorpay payment integration, protected file delivery, Cloudinary previews, and Cloudflare R2 storage.",
      tech: ["Next.js", "Node.js", "Cloudflare R2", "Razorpay", "Cloudinary"],
      image: "bg-gradient-to-br from-orange-500 to-red-600",
      github: "#",
      demo: "https://cncmarket.in",
      status: "Completed",
      featured: true,
      gradient: "from-orange-500 to-red-600",
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
      demo: "#",
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
      github: "#",
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
      image: "bg-gradient-to-br from-red-600 to-rose-800",
      github: "#",
      demo: "#",
      status: "Completed",
      featured: false,
      gradient: "from-red-600 to-rose-800",
    },
  ];

  const stats = [
    { number: "15+", label: "Projects Built", icon: Code },
    { number: "4", label: "Featured Works", icon: Star },
    { number: "2+", label: "Years Experience", icon: Calendar },
    { number: "1000+", label: "Code Commits", icon: Github },
  ];

  return (
    <div
      ref={projectsRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm mb-6"
          >
            <Rocket size={16} className="mr-2" />
            Showcasing my work
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            A collection of projects that showcase my skills in full-stack
            development, UI/UX design, and problem-solving
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map(({ number, label, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center group hover:border-orange-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon size={24} className="text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">
                  {number}
                </div>
                <div className="text-sm text-gray-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <ProjectSkeleton key={idx} />
              ))
            : projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Project Image/Gradient */}
              <div className="relative h-48 overflow-hidden">
                {project.image.startsWith("/") ? (
                  <div className="relative h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  </div>
                ) : (
                  <div
                    className={`h-full ${project.image} flex items-center justify-center relative`}
                  >
                    <Code size={48} className="text-white opacity-80 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      project.status === "Completed"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {project.status === "Completed"
                      ? "✓ Completed"
                      : "⚡ In Progress"}
                  </span>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-medium backdrop-blur-sm">
                      <Star size={12} className="inline mr-1" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight size={20} className="text-orange-400" />
                  </motion.div>
                </div>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    {project.github && project.github !== "#" && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-orange-400 transition-colors group/link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github
                          size={16}
                          className="mr-2 group-hover/link:rotate-12 transition-transform"
                        />
                        <span className="text-sm font-medium">Code</span>
                      </motion.a>
                    )}

                    {project.demo && project.demo !== "#" && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 hover:text-orange-400 transition-colors group/link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye
                          size={16}
                          className="mr-2 group-hover/link:scale-110 transition-transform"
                        />
                        <span className="text-sm font-medium">Demo</span>
                      </motion.a>
                    )}
                  </div>

                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-medium hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>

            <motion.button
              className="px-8 py-4 border border-orange-500/50 rounded-full text-orange-400 font-semibold hover:bg-orange-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-500 text-sm"
          >
            Want to see more? Check out my{" "}
            <a
              href="https://github.com/Aaditya-kumar-singh"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              GitHub profile
            </a>{" "}
            for additional projects and contributions.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
