"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { type FC, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface GridDotBackgroundProps {
  children: ReactNode;
  className?: string;
  dotColor?: string;
  maskColor?: string;
  maskSize?: number;
}

const GridDotBackground: FC<GridDotBackgroundProps> = ({
  children,
  className,
  dotColor = "rgba(255, 255, 255, 0.3)",
  maskColor = "#000000",
  maskSize = 500,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full h-full bg-black", className)}
      style={{
        '--dot-color': dotColor,
        '--mask-color': maskColor,
        '--mask-size': `${maskSize}px`,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
          backgroundSize: `20px 20px`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          maskImage: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => `radial-gradient(var(--mask-size) circle at ${x}px ${y}px, var(--mask-color) 0%, transparent 100%)`
          ),
          WebkitMaskImage: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => `radial-gradient(var(--mask-size) circle at ${x}px ${y}px, var(--mask-color) 0%, transparent 100%)`
          ),
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(var(--dot-color) 1px, transparent 1px)`,
            backgroundSize: `20px 20px`,
          }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridDotBackground;
