import React from "react";
import { motion } from "framer-motion";

const SectionDivider = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center py-16 ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Main line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* Center decoration */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-glow"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Side decorations */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="w-1 h-1 bg-orange-400 rounded-full opacity-60"></div>
        <div className="w-1 h-1 bg-orange-400 rounded-full opacity-40"></div>
        <div className="w-1 h-1 bg-orange-400 rounded-full opacity-20"></div>
      </motion.div>
    </motion.div>
  );
};

export default SectionDivider;
