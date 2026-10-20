import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import {
  ExternalLink,
  Award,
  Calendar,
  BookOpen,
  Trophy,
  Star,
  CheckCircle,
  Clock,
  GraduationCap,
  Code,
  Database,
  Globe,
} from "lucide-react";

const ExperiencePage = () => {
  const experienceRef = useRef(null);
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const isInView = useInView(experienceRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView || reduceMotion) {
      controls.start("visible");
    }
  }, [controls, isInView, reduceMotion]);


  const containerVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: reduceMotion ? 0 : 0.2,
        staggerChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: reduceMotion ? 0 : 30, opacity: reduceMotion ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        ease: "easeOut",
      },
    },
  };

  const certifications = [
    {
      title: "Full-Stack Web Development",
      issuer: "Udemy",
      period: "Completed in 2025",
      description:
        "Comprehensive course covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Git, Docker, Microservices with MoleculerJS, Software Testing, and deployment strategies.",
      link: "https://drive.google.com/file/d/1eAxDWd56Ron3enWzE2hykfjdLJm6D1rr/view?usp=sharing",
      status: "completed",
      featured: true,
      skills: ["React", "Node.js", "MongoDB", "Docker", "Testing"],
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "C++ Programming",
      issuer: "Udemy",
      period: "Completed in 2025",
      description:
        "Advanced C++ programming covering object-oriented programming principles, STL (Standard Template Library), data structures, and algorithmic problem-solving techniques.",
      link: "https://drive.google.com/file/d/1MjhcCekwqDaEjmmyO3shcHZHJBLIP9vA/view?usp=sharing",
      status: "completed",
      featured: false,
      skills: ["C++", "OOP", "STL", "Algorithms"],
      icon: Code,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "JavaScript Programming",
      issuer: "Udemy",
      period: "Completed in 2025",
      description:
        "Modern JavaScript development including ES6+ features, DOM manipulation, asynchronous programming, promises, async/await, and test-driven development practices.",
      link: "https://drive.google.com/file/d/1eU-C3utmAXZLC2LCOwr3fHVOLtgSkMuR/view?usp=sharing",
      status: "completed",
      featured: true,
      skills: ["JavaScript", "ES6+", "DOM", "Async/Await"],
      icon: Code,
      color: "from-yellow-500 to-cyan-500",
    },
    {
      title: "Python for Beginners to Advanced",
      issuer: "Great Learning / Udemy",
      period: "In Progress",
      description:
        "Comprehensive Python programming course covering fundamentals to advanced topics including object-oriented programming, file handling, modules, and data structures.",
      link: "#",
      status: "in-progress",
      featured: false,
      skills: ["Python", "OOP", "Data Structures", "File Handling"],
      icon: Database,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const timelineData = [
    {
      type: "Experience",
      title: "Frontend Intern",
      organization: "VenueMonk Pvt. Ltd.",
      period: "06/2025 - 01/2026",
      details: "Developed production website using React. Migrated legacy JS from ES5 to ES6+. Integrated REST APIs and refactored components using clean code principles.",
      icon: Code,
      color: "from-blue-500 to-cyan-500"
    },
    {
      type: "Education",
      title: "B.Tech - Computer Science & Engineering",
      organization: "Punjab Technical University, Amritsar",
      period: "06/2022 - 04/2026",
      details: "GPA: 7.6",
      icon: GraduationCap,
      color: "from-purple-500 to-violet-500"
    },
    {
      type: "Education",
      title: "Senior Secondary Education (Non-Medical)",
      organization: "P.T.J.M College, Nalanda, Rajgir",
      period: "03/2020 - 05/2022",
      details: "Score: 67%",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-400" />;
      case "in-progress":
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return <BookOpen size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div
      ref={experienceRef}
      className="experience-page-redesign min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
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
            className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm mb-6"
          >
            <GraduationCap size={16} className="mr-2" />
            Continuous learning journey
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Certifications & <span className="gradient-text">Experience</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            A showcase of my continuous learning journey and professional
            development through various certifications and hands-on experience.
          </motion.p>

        </motion.div>

        {/* Certifications Grid */}
        <div id="certificates-grid" className="space-y-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className={`cert-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 ${
                cert.featured ? "ring-2 ring-cyan-500/20" : ""
              }`}
              whileHover={{ scale: 1.01, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  {/* Left Side - Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${cert.color} rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300`}
                      >
                        <cert.icon size={28} className="text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {cert.title}
                          </h3>
                          {cert.featured && (
                            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-medium">
                              <Star size={12} className="inline mr-1" />
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-cyan-500 font-semibold">
                            {cert.issuer}
                          </span>
                          <span className="text-gray-400 flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {cert.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {cert.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cert.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/50 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1 + skillIndex * 0.05,
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Status & Action */}
                  <div className="flex flex-col items-end space-y-4">
                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${getStatusColor(
                        cert.status
                      )}`}
                    >
                      {getStatusIcon(cert.status)}
                      <span className="capitalize">
                        {cert.status.replace("-", " ")}
                      </span>
                    </div>

                    {cert.link && cert.link !== "#" && cert.status === "completed" ? (
                      <motion.a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-xl text-cyan-300 font-medium hover:bg-cyan-500/10 transition-colors duration-200 group/btn" whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }}>
                        <span>View Certificate</span>
                        <ExternalLink size={16} className="ml-2" />
                      </motion.a>
                    ) : (
                      <span className="px-4 py-3 text-sm text-gray-400">Certificate pending completion</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Experience & Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            Experience & <span className="gradient-text">Education</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-violet-500"></div>

            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className="timeline-item flex items-start space-x-6"
                  variants={itemVariants}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center relative z-10 shadow-glow`}>
                    <item.icon size={24} className="text-white" />
                  </div>

                  <div className="flex-1 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-cyan-500/50 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="px-3 py-1 bg-gray-700/50 text-cyan-400 text-xs rounded-full border border-gray-600/50 mt-2 sm:mt-0">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-cyan-400 font-medium mb-2">
                      {item.organization}
                    </p>
                    <p className="text-gray-400 text-sm mb-3 flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {item.period}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

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
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300" onClick={() => document.getElementById("certificates-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Certificates
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download
              className="px-8 py-4 border border-cyan-500/50 rounded-full text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-500 text-sm"
          >
            Always learning, always growing. Stay tuned for more certifications
            and achievements!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePage;
