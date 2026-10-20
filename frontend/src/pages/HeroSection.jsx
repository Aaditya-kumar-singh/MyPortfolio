import React, { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Code, Palette, Rocket, ExternalLink } from "lucide-react";

const HeroScene = lazy(() => import("../components/HeroScene"));

const socialLinks = [
  { icon: Github, href: "https://github.com/Aaditya-kumar-singh", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/aadityakumar1", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kumaraaditya324@gmail.com", label: "Email" },
];

const capabilities = [
  { icon: Code, label: "Development" },
  { icon: Palette, label: "Interface design" },
  { icon: Rocket, label: "Problem solving" },
];

const copyVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(7px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.09 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: "easeOut" } },
};

const HeroSection = ({ onNavigate }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-home-section relative flex items-center overflow-hidden text-white px-0 pt-24 pb-16 md:pt-28">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-cover bg-[position:30%_center] md:bg-center" style={{ backgroundImage: "url('/Aaditya_pic.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060B] via-[#06060B]/75 to-[#06060B]/45 md:bg-gradient-to-r md:from-[#06060B]/30 md:via-[#06060B]/65 md:to-[#06060B]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060B]/25 via-transparent to-[#06060B]" />
      </div>

      <motion.div
        className="hero-scene-stage pointer-events-none absolute z-[1]"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        <Suspense fallback={<div className="hero-scene-fallback" />}>
          <HeroScene className="hero-scene-canvas" />
        </Suspense>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          className="hero-copy max-w-2xl md:ml-auto"
          variants={copyVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.p variants={lineVariants} className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-cyan-300 mb-5">Full-stack developer</motion.p>
          <motion.h1 variants={lineVariants} className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] font-bold tracking-tight mb-7">
            Aaditya <span className="gradient-text">Kumar</span>
          </motion.h1>
          <motion.p variants={lineVariants} className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 max-w-xl mb-8">
            Crafting digital experiences with precision and code. I build thoughtful, accessible web applications with modern frontend and backend technologies.
          </motion.p>
          <motion.p variants={lineVariants} className="text-sm sm:text-base text-cyan-200 mb-8">Open to exciting projects and collaborations.</motion.p>

          <motion.div variants={lineVariants} className="flex flex-wrap gap-3 mb-8">
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-2 rounded-full border border-gray-600/60 bg-gray-900/50 px-3 py-2 text-sm text-gray-300 backdrop-blur-sm">
                <Icon size={16} className="text-cyan-300" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={lineVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
            <motion.button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 font-semibold text-white shadow-glow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300" whileHover={reduceMotion ? undefined : { y: -2, boxShadow: "0 12px 34px rgba(6,182,212,0.2)" }} whileTap={reduceMotion ? undefined : { scale: 0.99 }} onClick={() => onNavigate?.("projects")}>
              View My Work <ExternalLink size={16} aria-hidden="true" />
            </motion.button>
            <motion.a whileHover={reduceMotion ? undefined : { y: -2 }} href="/resume.pdf" download className="inline-flex min-h-11 items-center justify-center rounded-full border border-violet-400/50 bg-violet-500/5 px-6 py-3 font-semibold text-violet-200 hover:bg-violet-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300">
              Download CV
            </motion.a>
          </motion.div>

          <motion.div variants={lineVariants} className="flex items-center gap-3" aria-label="Social profiles">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={reduceMotion ? undefined : { scale: 0.96 }} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} aria-label={label} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-900/55 text-gray-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                <Icon size={18} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-gray-400/80" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
        {reduceMotion ? <ArrowDown size={15} /> : <motion.div animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}><ArrowDown size={15} /></motion.div>}
      </div>
    </section>
  );
};

export default HeroSection;
