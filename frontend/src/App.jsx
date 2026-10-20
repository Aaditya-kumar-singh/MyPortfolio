import React, { useState, useEffect, useRef } from "react";
import "./portfolio-pages.css";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Navigation from "./components/Navigation";
import SectionDivider from "./components/SectionDivider";
import ScrollIndicator from "./components/ScrollIndicator";
import Footer from "./components/Footer";
import HeroSection from "./pages/HeroSection";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import SketchbookPage from "./pages/SketchbookPage";

const SECTION_META = {
  home: { index: "01", label: "HERO // CORE" },
  about: { index: "02", label: "ABOUT // IDENTITY" },
  projects: { index: "03", label: "PROJECTS // BUILDS" },
  sketchbook: { index: "04", label: "SKETCHBOOK // LAB" },
  experience: { index: "05", label: "JOURNEY // TIMELINE" },
  contact: { index: "06", label: "CONTACT // TRANSMIT" },
};

const App = () => {
  useEffect(() => {
    const splash = document.getElementById("initial-splash");
    if (!splash) return undefined;

    const skipButton = splash.querySelector("[data-splash-skip]");
    let timeoutId;
    const finishSplash = () => {
      try {
        window.sessionStorage.setItem("precision-splash-seen", "true");
      } catch {
        // Storage can be unavailable in privacy-restricted contexts.
      }
      splash.classList.add("is-leaving");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => splash.remove(), 450);
    };
    const handleSkip = (event) => {
      event.preventDefault();
      finishSplash();
    };
    skipButton?.addEventListener("click", handleSkip);

    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem("precision-splash-seen") === "true";
    } catch {
      // Storage can be unavailable in privacy-restricted contexts.
    }

    if (alreadySeen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishSplash();
    } else {
      timeoutId = window.setTimeout(finishSplash, 1450);
    }

    return () => {
      window.clearTimeout(timeoutId);
      skipButton?.removeEventListener("click", handleSkip);
    };
  }, []);

  const [currentSection, setCurrentSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const sketchbookRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const sections = React.useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    sketchbook: sketchbookRef,
    experience: experienceRef,
    contact: contactRef,
  }), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      const y = window.scrollY;
      setShowScrollTop((previous) => {
        const next = y > 500;
        return previous === next ? previous : next;
      });
      const scrollPosition = y + window.innerHeight * 0.45;
      for (const [sectionName, ref] of Object.entries(sections)) {
        if (!ref.current) continue;
        const { top, height } = ref.current.getBoundingClientRect();
        const sectionTop = top + y;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
          setCurrentSection((previous) => previous === sectionName ? previous : sectionName);
          break;
        }
      }
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateScrollState();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  const scrollToSection = (sectionName) => {
    const ref = sections[sectionName];
    if (ref?.current) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(ref.current, { offset: -64, duration: 1 });
      } else {
        ref.current.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  };

  return (
    <div className="portfolio-app relative">
      <a className="skip-to-content" href="#main-content">Skip to main content</a>

      <Navigation
        currentPage={currentSection}
        setCurrentPage={scrollToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main id="main-content" className="relative" tabIndex={-1}>
        <section ref={homeRef} id="home" className="min-h-screen" aria-label="Home">
          <HeroSection onNavigate={scrollToSection} />
        </section>
        <SectionDivider />

        <section ref={aboutRef} id="about" className="min-h-screen">
          <AboutPage onNavigate={scrollToSection} />
        </section>
        <SectionDivider />

        <section ref={projectsRef} id="projects" className="min-h-screen">
          <ProjectsPage onNavigate={scrollToSection} />
        </section>
        <SectionDivider />

        <section ref={sketchbookRef} id="sketchbook" className="min-h-screen">
          <SketchbookPage />
        </section>
        <SectionDivider />

        <section ref={experienceRef} id="experience" className="min-h-screen">
          <ExperiencePage onNavigate={scrollToSection} />
        </section>
        <SectionDivider />

        <section ref={contactRef} id="contact" className="min-h-screen">
          <ContactPage />
        </section>
        <Footer scrollToTop={scrollToTop} />
      </main>

      <ScrollIndicator />
      <motion.button
        type="button"
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-glow"
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 32, pointerEvents: showScrollTop ? "auto" : "none" }}
        transition={{ duration: 0.2 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
};

export default App;
