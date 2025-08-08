import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 23,
  name: "Follower Pointer",
  slug: "follower-pointer",
  description: "A container that adds a custom pointer that follows the mouse, with an optional title.",
  category: "Effects",
  code: {
    tsx: `
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { type FC, type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface FollowerPointerProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}

const FollowerPointer: FC<FollowerPointerProps> = ({
  children,
  title,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          translateX: xSpring,
          translateY: ySpring,
        }}
        className="absolute left-0 top-0 h-4 w-4 rounded-full bg-purple-500 pointer-events-none"
      >
        {title && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap mt-2"
          >
            <div className="px-2 py-1 rounded-md bg-black/80 text-white text-xs border border-white/10 backdrop-blur-sm">
              {title}
            </div>
          </motion.div>
        )}
      </motion.div>
      {children}
    </div>
  );
};

export default FollowerPointer;
    `,
  },
  props: [
    { name: "children", type: "ReactNode", description: "The content to wrap with the follower pointer." },
    { name: "title", type: "ReactNode", defaultValue: "Vercel", description: "A title to display next to the pointer." },
    { name: "className", type: "string", description: "Additional classes for the container." },
  ],
};

export default component;
