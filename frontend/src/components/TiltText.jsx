import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

function TiltText() {
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      ".tilt-line",
      { y: 100, opacity: 0, rotateX: 90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      }
    );

    // Add floating animation
    gsap.to(".tilt-text", {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
    });
  }, []);

  return (
    <motion.div
      ref={textRef}
      className="mt-[15vw] flex items-end justify-center flex-col px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.h1
        className="tilt-line tilt-text text-[4.2vw] md:text-[3.5vw] uppercase font-bold leading-[4vw] md:leading-[3.5vw] text-right"
        style={{ fontFamily: "f2, Inter, sans-serif" }}
      >
        I am a{" "}
        <span className="gradient-text relative">
          CREATIVE
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg blur-lg"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
      </motion.h1>

      <motion.h2
        className="tilt-line tilt-text text-[4.5vw] md:text-[4vw] font-extrabold leading-[5vw] md:leading-[4.5vw] text-right"
        style={{ fontFamily: "f, Inter, sans-serif" }}
      >
        <span className="gradient-text">FULL-STACK</span> DEVELOPER
      </motion.h2>

      <motion.h3
        className="tilt-line tilt-text text-[4.2vw] md:text-[3.5vw] uppercase font-bold leading-[4vw] md:leading-[3.5vw] text-right"
        style={{ fontFamily: "f1, Inter, sans-serif" }}
      >
        Available{" "}
        <span className="text-orange-400 relative">
          To Hire
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          />
        </span>
      </motion.h3>

      {/* Decorative elements */}
      <motion.div
        className="mt-8 flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
      </motion.div>
    </motion.div>
  );
}

export default TiltText;
