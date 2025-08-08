import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 9,
  name: "Text Reveal",
  slug: "text-reveal",
  description: "Reveal text word-by-word with a granular animation as you scroll.",
  category: "Text Effects",
  code: {
    tsx: `
"use client";

import { type FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  stagger?: number;
}

const TextReveal: FC<TextRevealProps> = ({ text, className, stagger = 0.05 }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={cn(
        "flex flex-wrap text-2xl md:text-4xl font-bold text-white",
        className
      )}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TextReveal;
     `
  },
  props: [
    { name: 'text', type: 'long-string', defaultValue: 'Build stunning, animated user interfaces with the power of Framer Motion and React.', description: 'The text content to reveal.' },
    { name: 'stagger', type: 'number', defaultValue: 0.05, description: 'The delay between each word appearing.' },
    { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for styling the container.' },
  ]
};

export default component;
