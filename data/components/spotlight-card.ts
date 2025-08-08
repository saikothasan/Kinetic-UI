import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 11,
  name: "Spotlight Card",
  slug: "spotlight-card",
  description: "A card that reveals a spotlight effect following the mouse.",
  category: "Cards",
  code: {
    tsx: `
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type FC, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

const SpotlightCard: FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = "rgba(236, 72, 153, 0.5)", // Default: pink-500 with 50% opacity
  spotlightSize = 350,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--spotlight-color': spotlightColor,
        '--spotlight-size': \`\${spotlightSize}px\`,
      } as React.CSSProperties}
      className={cn(
        "relative w-full h-96 p-8 rounded-2xl bg-black/30 border border-white/10 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          opacity: opacitySpring,
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => \`radial-gradient(var(--spotlight-size) circle at \${x}px \${y}px, var(--spotlight-color), transparent 80%)\`
          ),
        }}
      />
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
     `
  },
  props: [
    { name: 'children', type: 'ReactNode', description: 'The content inside the card.' },
    { name: 'spotlightColor', type: 'color', defaultValue: 'rgba(236, 72, 153, 0.5)', description: 'The color of the spotlight.' },
    { name: 'spotlightSize', type: 'number', defaultValue: 350, description: 'The size (in pixels) of the spotlight circle.' },
    { name: 'className', type: 'string', description: 'Additional classes for styling the card.' },
  ]
};

export default component;
