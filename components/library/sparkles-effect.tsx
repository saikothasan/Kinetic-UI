"use client";

import React, { useEffect, useState, type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SparklesEffectProps {
  children: ReactNode;
  className?: string;
  particleColor?: string;
  particleCount?: number;
  particleSize?: number;
  particleDensity?: number;
}

const SparklesEffect: FC<SparklesEffectProps> = ({
  children,
  className,
  particleColor = "#FFFFFF",
  particleCount = 50,
  particleSize = 1,
  particleDensity = 0.5,
}) => {
  const [sparkles, setSparkles] = useState<
    { id: number; top: string; left: string; animationDelay: string; animationDuration: string }[]
  >([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 1 + 0.5}s`,
    }));
    setSparkles(newSparkles);
  }, [particleCount]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="absolute rounded-full animate-sparkle"
            style={{
              top: sparkle.top,
              left: sparkle.left,
              width: `${particleSize}px`,
              height: `${particleSize}px`,
              backgroundColor: particleColor,
              animationDelay: sparkle.animationDelay,
              animationDuration: sparkle.animationDuration,
              opacity: particleDensity,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export default SparklesEffect;
