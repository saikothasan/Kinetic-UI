import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 6,
  name: "Floating Card",
  slug: "floating-card",
  description: "A card that floats and tilts based on mouse position.",
  category: "Cards",
  code: {
    tsx: `
"use client";

import { useRef, type FC, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  rotationStrength?: number;
  contentTranslateZ?: number;
  glowColor?: string;
  noiseOpacity?: number;
  glassmorphism?: boolean;
  animatedGlow?: boolean;
}

const FloatingCard: FC<FloatingCardProps> = ({
  children,
  className,
  rotationStrength = 25,
  contentTranslateZ = 20,
  glowColor = "radial-gradient(circle at center, #8B5CF6, #EC4899, #F59E0B, #10B981, #8B5CF6)",
  noiseOpacity = 0.1,
  glassmorphism = true,
  animatedGlow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = event.clientX - left - width / 2;
    const y = event.clientY - top - height / 2;

    mouseX.set(x);
    mouseY.set(y);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowOpacity.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [rotationStrength, -rotationStrength]);
  const rotateY = useTransform(mouseX, [-150, 150], [-rotationStrength, rotationStrength]);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 30 });

  const glowStyle = {
    ...(glowColor?.includes("gradient")
      ? { 
          backgroundImage: glowColor,
          backgroundSize: animatedGlow ? "200% 200%" : "100% 100%",
        }
      : { backgroundColor: glowColor }),
  };

  const noiseBackground = \`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      className={cn(
        "relative w-72 h-96 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/20 overflow-hidden",
        glassmorphism
          ? "bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-lg"
          : "bg-gradient-to-br from-purple-900 to-indigo-900",
        className
      )}
    >
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: noiseBackground,
          opacity: noiseOpacity,
        }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        {/* The Glow */}
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            opacity: glowOpacitySpring,
            ...glowStyle,
          }}
          className={cn(
            "absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            animatedGlow && glowColor?.includes("gradient") && "animate-glow-pan"
          )}
        />
      </div>

      <div
        style={{
          transform: "translateZ(var(--content-translate-z, 20px))",
          transformStyle: "preserve-3d",
          '--content-translate-z': \`\${contentTranslateZ}px\`,
        } as React.CSSProperties}
        className="relative inset-0 flex flex-col items-center justify-center p-4 h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingCard;
     `
  },
  props: [
    { name: 'children', type: 'ReactNode', defaultValue: 'Hover over me', description: 'The content inside the card.' },
    { name: 'rotationStrength', type: 'number', defaultValue: 25, description: 'Controls the maximum tilt angle.' },
    { name: 'contentTranslateZ', type: 'number', defaultValue: 20, description: 'How much the content "pops out" from the card.' },
    { name: 'glowColor', type: 'long-string', defaultValue: 'radial-gradient(circle at center, #8B5CF6, #EC4899, #F59E0B, #10B981, #8B5CF6)', description: 'The color or CSS gradient for the glow effect.' },
    { name: 'noiseOpacity', type: 'number', defaultValue: 0.1, description: 'The opacity of the grainy noise overlay. Set to 0 to disable.' },
    { name: 'glassmorphism', type: 'boolean', defaultValue: true, description: "Toggles the frosted glass effect on the card's background." },
    { name: 'animatedGlow', type: 'boolean', defaultValue: true, description: 'Toggles the animation of the glow gradient.' },
    { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for styling.' },
  ]
};

export default component;
