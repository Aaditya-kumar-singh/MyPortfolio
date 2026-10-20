import React from "react";
import { motion } from "framer-motion";
import { useScrollProgress } from "../hooks/useScrollAnimation";
const ScrollIndicator = () => {
  const scrollProgress = useScrollProgress();
  return <motion.div role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(scrollProgress)} className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 z-50 origin-left" style={{ scaleX: scrollProgress / 100 }} initial={{ scaleX: 0 }} animate={{ scaleX: scrollProgress / 100 }} transition={{ duration: 0.1, ease: "easeOut" }} />;
};
export default ScrollIndicator;
