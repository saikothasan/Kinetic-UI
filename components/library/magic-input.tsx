"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, type FC } from "react";

interface MagicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const MagicInput: FC<MagicInputProps> = ({
  className,
  containerClassName,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);

    const matrix = () => {
      if (!ctx) return;
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#a855f7"; // purple-500
      ctx.font = "15pt monospace";

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) {
          ypos[ind] = 0;
        } else {
          ypos[ind] = y + 20;
        }
      });
    };

    let animationFrameId: number;
    const render = () => {
      matrix();
      animationFrameId = requestAnimationFrame(render);
    };

    if (isFocused) {
      render();
    }

    const handleResize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isFocused]);

  return (
    <div
      className={cn(
        "relative w-full max-w-xs p-px rounded-lg",
        "bg-gradient-to-r from-purple-500/30 to-indigo-500/30",
        "transition-all duration-300",
        isFocused && "from-purple-500 to-indigo-500",
        containerClassName
      )}
    >
      <div className="relative bg-black rounded-[7px] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "relative w-full p-3 bg-transparent text-white placeholder:text-gray-500 outline-none",
            "focus:ring-0",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
};

export default MagicInput;
