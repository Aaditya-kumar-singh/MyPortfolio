import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Sparkles,
  Code,
  Palette,
  Rocket,
} from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
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

  const headingVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={heroRef}
      className="min-h-screen relative flex items-end md:items-center text-white overflow-hidden pt-16 md:pt-24 pb-4"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-[position:25%_center] md:bg-center bg-fixed"
          style={{ backgroundImage: `url(Aaditya_pic.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 md:from-black/10 via-black/70 md:via-black/50 to-black/20 md:to-black/90" />

        {/* Animated overlay patterns */}
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-gray-900/50 to-transparent" />
      </motion.div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-orange-500/10 rounded-full blur-xl"
          animate={{
            y: [-15, 15, -15],
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            y: [20, -20, 20],
            scale: [1.15, 1, 1.15],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 w-full md:w-[60%] lg:w-[50%] md:ml-auto px-6 md:px-12 text-center md:text-left pb-16 md:pb-0 pt-2 md:pt-0"
      >
        {/* Main Title */}
        <div className="mb-3 md:mb-5">
          <motion.h2
            variants={textVariants}
            className="hero-title text-sm md:text-base lg:text-lg font-medium text-gray-300 tracking-wide mb-1"
          >
            I am a <span className="font-bold gradient-text">CREATIVE</span>{" "}
            DESIGNER &
          </motion.h2>

          <motion.h1
            variants={headingVariants}
            className="hero-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            FullStack{" "}
            <span className="gradient-text relative">
              Developer
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg blur-lg"
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          variants={textVariants}
          className="hero-description text-xs sm:text-sm md:text-base text-gray-300 mb-4 md:mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed"
        >
          Passionate about crafting{" "}
          <span className="text-orange-400 font-semibold">
            beautiful digital experiences
          </span>{" "}
          through innovative design and clean code.{" "}
          <span className="block mt-1 text-orange-300">
            Available for exciting projects and collaborations.
          </span>
        </motion.p>

        {/* Skills Icons */}
        <motion.div
          variants={textVariants}
          className="flex justify-center md:justify-start items-center space-x-5 md:space-x-8 mb-4 md:mb-6"
        >
          {[
            { icon: Code, label: "Development" },
            { icon: Palette, label: "Design" },
            { icon: Rocket, label: "Innovation" },
          ].map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              className="flex flex-col items-center group cursor-pointer"
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mb-1 group-hover:shadow-glow transition-all duration-300">
                <Icon size={18} className="text-orange-400 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-orange-400 transition-colors">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={textVariants}
          className="flex items-center justify-center md:justify-start space-x-4 mb-6 md:mb-6"
        >
          {[
            {
              icon: Github,
              href: "https://github.com/Aaditya-kumar-singh",
              label: "GitHub",
            },
            {
              icon: Linkedin,
              href: "https://www.linkedin.com/in/aadityakumar1",
              label: "LinkedIn",
            },
            {
              icon: Mail,
              href: "mailto:kumaraaditya324@gmail.com",
              label: "Email",
            },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={14} className="md:w-4 md:h-4" />
              <span className="sr-only">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={buttonVariants}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mb-2"
        >
          <motion.button
            className="group relative w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold shadow-glow overflow-hidden text-xs md:text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="w-full sm:w-auto px-6 py-2.5 border border-orange-500/50 rounded-full text-orange-400 font-semibold hover:bg-orange-500/10 transition-all duration-300 text-xs md:text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={textVariants}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gray-400/80"
        >
          <span className="text-[10px] mb-0.5">Scroll to explore</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

      {/* Signature */}
      <motion.p
        variants={textVariants}
        className="absolute bottom-2 right-4 text-[10px] text-gray-500/80 font-mono z-20"
      >
        Crafted with ❤️ by @Aaditya
      </motion.p>
    </div>
  );
};

export default HeroSection;
