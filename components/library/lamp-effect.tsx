"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type FC, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface LampEffectProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  lampColor?: string;
  glowColor?: string;
}

const LampEffect: FC<LampEffectProps> = ({
  children,
  className,
  containerClassName,
  lampColor = "white",
  glowColor = "rgba(255, 255, 255, 0.1)",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
  };

  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
  });

  const lightX = useTransform(springX, [0, ref.current?.clientWidth || 0], [-100, (ref.current?.clientWidth || 0) + 100]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full bg-slate-950 overflow-hidden", containerClassName)}
    >
      <div className={cn("relative z-10 p-8", className)}>{children}</div>
      <div className="absolute inset-0 z-0" style={{
        '--lamp-color': lampColor,
        '--glow-color': glowColor,
      } as React.CSSProperties}>
        <motion.div
          className="absolute inset-x-0 h-px w-full -top-px"
          style={{
            background: `linear-gradient(to right, transparent, var(--lamp-color), transparent)`,
          }}
        />
        <motion.div
          className="absolute h-48 w-px -top-48"
          style={{
            left: springX,
            background: `linear-gradient(to bottom, transparent, var(--lamp-color))`,
          }}
        />
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0.5,
            background: useTransform(
              lightX,
              (x) => `radial-gradient(350px circle at ${x}px 0px, var(--glow-color), transparent 80%)`
            ),
          }}
        />
      </div>
    </div>
  );
};

export default LampEffect;
