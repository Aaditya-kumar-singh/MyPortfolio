import React from "react";
import { motion } from "framer-motion";
import { useScrollProgress } from "../hooks/useScrollAnimation";

const ScrollIndicator = () => {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </>
  );
};

export default ScrollIndicator;
