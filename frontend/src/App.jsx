import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import SectionDivider from "./components/SectionDivider";
import ScrollIndicator from "./components/ScrollIndicator";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import IntroAnimation from "./components/IntroAnimation";

const App = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Refs for each section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const sections = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    experience: experienceRef,
    contact: contactRef,
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine current section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      Object.entries(sections).forEach(([sectionName, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(sectionName);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionName) => {
    const ref = sections[sectionName];
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-dots opacity-5" />
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation
        currentPage={currentSection}
        setCurrentPage={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Scrollable Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          ref={homeRef}
          id="home"
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.section>

        {/* Section Divider */}
        <SectionDivider />

        {/* About Section */}
        <motion.section
          ref={aboutRef}
          id="about"
          className="min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <AboutPage />
        </motion.section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Projects Section */}
        <motion.section
          ref={projectsRef}
          id="projects"
          className="min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ProjectsPage />
        </motion.section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Experience Section */}
        <motion.section
          ref={experienceRef}
          id="experience"
          className="min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ExperiencePage />
        </motion.section>

        {/* Section Divider */}
        <SectionDivider />

        {/* Contact Section */}
        <motion.section
          ref={contactRef}
          id="contact"
          className="min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <ContactPage />
        </motion.section>

        {/* Footer */}
        <Footer scrollToTop={scrollToTop} />
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollIndicator />

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white shadow-glow z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: scrollY > 500 ? 1 : 0,
          y: scrollY > 500 ? 0 : 100,
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19V5M5 12L12 5L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default App;
