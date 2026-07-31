import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Code,
  Database,
  Cloud,
  Wrench,
  Palette,
  Brain,
  Heart,
  Zap,
  Award,
  Target,
} from "lucide-react";
import { gsap } from "gsap";

const AboutPage = () => {
  const aboutRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    // GSAP animation for skill cards
    gsap.fromTo(
      ".skill-card",
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.5,
      }
    );
  }, [isInView]);

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

  const skills = [
    {
      category: "Frontend",
      icon: Code,
      skills: ["React.js", "Next.js", "Vite", "Tailwind CSS", "HTML5", "CSS3"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend",
      icon: Database,
      skills: ["Node.js", "Express.js", "REST APIs", "WebSockets"],
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "Databases",
      icon: Database,
      skills: ["MongoDB", "MySQL"],
      color: "from-yellow-500 to-amber-500",
    },
    {
      category: "Languages",
      icon: Brain,
      skills: ["JavaScript (ES6+)", "TypeScript", "C++", "SQL"],
      color: "from-pink-500 to-rose-500",
    },
    {
      category: "Tools & Platforms",
      icon: Wrench,
      skills: ["Git", "GitHub", "Postman", "Vercel"],
      color: "from-purple-500 to-violet-500",
    },
    {
      category: "Core Concepts",
      icon: Target,
      skills: ["OOP", "DSA", "API Development"],
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { number: "2+", label: "Years Experience", icon: Target },
    { number: "15+", label: "Projects Completed", icon: Award },
    { number: "6+", label: "Technologies", icon: Zap },
    { number: "100%", label: "Client Satisfaction", icon: Heart },
  ];

  return (
    <div
      ref={aboutRef}
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
            <Brain size={16} className="mr-2" />
            Get to know me better
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About <span className="gradient-text">Me</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Passionate developer crafting digital experiences with modern
            technologies
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative w-80 h-80 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="./Aaditya.png"
                  alt="Aaditya Kumar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed"
            >
              I'm a dedicated{" "}
              <span className="text-orange-400 font-semibold">
                full-stack developer
              </span>{" "}
              and Computer Science Engineering student who thrives on
              transforming complex ideas into
              <span className="text-orange-400 font-semibold">
                {" "}
                elegant, user-friendly solutions
              </span>
              .
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed"
            >
              My journey in web development has led me to master modern
              technologies like
              <span className="text-blue-400 font-semibold">
                {" "}
                React, Node.js, and MongoDB
              </span>
              , while constantly exploring emerging trends in
              <span className="text-purple-400 font-semibold">
                {" "}
                cybersecurity and cloud technologies
              </span>
              .
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed"
            >
              I believe in the power of{" "}
              <span className="text-green-400 font-semibold">
                collaborative development
              </span>
              and am always eager to tackle new challenges that push the
              boundaries of what's possible in web development.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {stats.map(({ number, label, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center group hover:border-orange-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={24} className="text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {number}
                  </div>
                  <div className="text-sm text-gray-400">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
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
            Technical <span className="gradient-text">Expertise</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(
              ({ category, icon: Icon, skills: skillList, color }, index) => (
                <motion.div
                  key={category}
                  className="skill-card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 group hover:border-orange-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mr-4 group-hover:shadow-glow transition-all duration-300`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/50 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            )}
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
            className="inline-flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download
              className="px-8 py-4 border border-orange-500/50 rounded-full text-orange-400 font-semibold hover:bg-orange-500/10 transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
