"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type FC, type ReactNode, useRef } from "react";

const BentoGrid: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.1 }}
      className={cn(
        "grid auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const BentoGridItem: FC<{
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}> = ({ className, title, description, header, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set(event.clientX - left - width / 2);
    mouseY.set(event.clientY - top - height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={variants}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-black/30 border-white/10 border justify-between flex flex-col space-y-4",
        className
      )}
    >
      <motion.div
        style={{
          transform: "translateZ(40px)",
          transformStyle: "preserve-3d",
        }}
        className="flex flex-1 w-full h-full"
      >
        {header}
      </motion.div>
      <motion.div
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
        className="group-hover/bento:translate-x-2 transition duration-200"
      >
        {icon}
        <div className="font-sans font-bold text-white mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-gray-400 text-xs">
          {description}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { BentoGrid, BentoGridItem };
