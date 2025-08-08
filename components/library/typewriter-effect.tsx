"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, type FC } from "react";

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
}

const TypewriterEffect: FC<TypewriterEffectProps> = ({ texts, className }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => texts[latest % texts.length]);

  useEffect(() => {
    const controls = animate(count, texts.length, {
      type: "tween",
      duration: texts.length * 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return controls.stop;
  }, [texts.length]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
        {displayText}
      </motion.h1>
      <motion.span
        className="ml-2 h-8 w-1 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

export default TypewriterEffect;
