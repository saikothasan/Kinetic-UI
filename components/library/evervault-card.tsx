"use client";

import { useMotionValue, motion, useSpring } from "framer-motion";
import React, { useRef, type FC, type ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EvervaultCardProps {
  children: ReactNode;
  className?: string;
}

const EvervaultCard: FC<EvervaultCardProps> = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const springConfig = { stiffness: 200, damping: 25 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "relative group w-full max-w-sm h-96 bg-transparent overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-black/95 group-hover:bg-black/90 transition-colors duration-300" />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          maskImage: `radial-gradient(250px circle at ${mouseXSpring.get()}px ${mouseYSpring.get()}px, white, transparent)`,
          WebkitMaskImage: `radial-gradient(250px circle at ${mouseXSpring.get()}px ${mouseYSpring.get()}px, white, transparent)`,
        }}
      >
        <EvervaultCardPattern />
      </motion.div>
      <div className="relative z-10 p-4 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const EvervaultCardPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gridSize = 30;
      const rows = Math.ceil(canvas.height / gridSize);
      const cols = Math.ceil(canvas.width / gridSize);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * gridSize;
          const y = i * gridSize;
          const noise = (Math.sin(x * 0.05 + time) + Math.cos(y * 0.05 + time)) * 0.5 + 0.5;
          
          ctx.fillStyle = `rgba(168, 85, 247, ${noise * 0.3})`; // purple-500
          ctx.beginPath();
          ctx.arc(x, y, noise * 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default EvervaultCard;
