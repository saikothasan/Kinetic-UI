import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 26,
  name: "Sparkles Effect",
  slug: "sparkles-effect",
  description: "A container that adds animated sparkling particles around its children.",
  category: "Effects",
  code: {
    tsx: `
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
      top: \`\${Math.random() * 100}%\`,
      left: \`\${Math.random() * 100}%\`,
      animationDelay: \`\${Math.random() * 2}s\`,
      animationDuration: \`\${Math.random() * 1 + 0.5}s\`,
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
              width: \`\${particleSize}px\`,
              height: \`\${particleSize}px\`,
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
    `,
  },
  props: [
    { name: "children", type: "ReactNode", description: "The content to wrap with the sparkles effect." },
    { name: "particleColor", type: "color", defaultValue: "#FFFFFF", description: "The color of the sparkle particles." },
    { name: "particleCount", type: "number", defaultValue: 50, description: "The number of particles to render." },
    { name: "particleSize", type: "number", defaultValue: 1, description: "The size of each particle in pixels." },
    { name: "particleDensity", type: "number", defaultValue: 0.5, description: "The base opacity of the particles (0 to 1)." },
    { name: "className", type: "string", description: "Additional classes for the container." },
  ],
};

export default component;
