import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroAnimation = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const textSequence = [
        { text: "Did I cook?", duration: 1.5, highlight: false },
        { text: "Or did I REALLY cook?", duration: 1.5, highlight: true },
        { text: "Aaditya Kumar", duration: 1.2, highlight: false, sub: "Full Stack Developer" },
        { text: "I don’t just build projects", duration: 1.2, highlight: false },
        { text: "I build presence.", duration: 2, highlight: true },
    ];

    useEffect(() => {
        let timer;
        if (step < textSequence.length) {
            timer = setTimeout(() => {
                setStep((prev) => prev + 1);
            }, textSequence[step].duration * 1000);
        } else {
            // Add a small buffer before unmounting
            timer = setTimeout(() => {
                onComplete();
            }, 500);
        }

        return () => clearTimeout(timer);
    }, [step, onComplete]);

    const variants = {
        initial: {
            opacity: 0,
            scale: 1.2,
            y: 100,
            filter: "blur(10px)"
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] // Custom quint-like easing for "snap" effect
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: -50,
            filter: "blur(10px)",
            transition: {
                duration: 0.4,
                ease: "easeIn"
            }
        }
    };

    if (step >= textSequence.length) return null;

    const currentText = textSequence[step];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    className="relative text-center px-4"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1 className={`text-4xl md:text-7xl font-black tracking-tight ${currentText.highlight ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600" : "text-white"}`}>
                        {currentText.text}
                    </h1>
                    {currentText.sub && (
                        <motion.p
                            className="mt-4 text-xl md:text-2xl text-gray-400 font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {currentText.sub}
                        </motion.p>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Cinematic grain overlay (optional) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};

export default IntroAnimation;
