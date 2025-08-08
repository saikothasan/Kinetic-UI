import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 22,
  name: "Grid & Dot Background",
  slug: "grid-dot-background",
  description: "A background with a grid of dots that illuminates on mouse hover.",
  category: "Backgrounds",
  code: {
    tsx: `
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
        '--mask-size': \`\${maskSize}px\`,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: \`radial-gradient(var(--dot-color) 1px, transparent 1px)\`,
          backgroundSize: \`20px 20px\`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          maskImage: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => \`radial-gradient(var(--mask-size) circle at \${x}px \${y}px, var(--mask-color) 0%, transparent 100%)\`
          ),
          WebkitMaskImage: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => \`radial-gradient(var(--mask-size) circle at \${x}px \${y}px, var(--mask-color) 0%, transparent 100%)\`
          ),
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: \`radial-gradient(var(--dot-color) 1px, transparent 1px)\`,
            backgroundSize: \`20px 20px\`,
          }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridDotBackground;
    `,
  },
  props: [
    { name: "children", type: "ReactNode", description: "Content to display on top of the background." },
    { name: "dotColor", type: "color", defaultValue: "rgba(255, 255, 255, 0.3)", description: "The color of the dots." },
    { name: "maskColor", type: "color", defaultValue: "#000000", description: "The color of the mask, should match the background." },
    { name: "maskSize", type: "number", defaultValue: 500, description: "The size of the illuminated circle area." },
    { name: "className", type: "string", description: "Additional classes for the container." },
  ],
};

export default component;
