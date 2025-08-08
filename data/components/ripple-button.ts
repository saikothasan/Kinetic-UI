import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 21,
  name: "Ripple Button",
  slug: "ripple-button",
  description: "A button that creates a material-style ripple effect on click.",
  category: "Buttons",
  code: {
    tsx: `
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  rippleColor?: string;
  rippleDuration?: number;
}

const RippleButton: FC<RippleButtonProps> = ({
  children,
  className,
  rippleColor = "rgba(255, 255, 255, 0.7)",
  rippleDuration = 0.7,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((state) => state.filter((r) => r.id !== newRipple.id));
    }, rippleDuration * 1000);

    props.onClick?.(event);
  };

  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 rounded-lg overflow-hidden",
        "bg-purple-600 text-white hover:bg-purple-700 transition-colors",
        className
      )}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map(({ x, y, id }) => (
          <motion.span
            key={id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: rippleDuration }}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              backgroundColor: rippleColor,
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

export default RippleButton;
    `,
  },
  props: [
    { name: "children", type: "ReactNode", defaultValue: "Click Me", description: "The content of the button." },
    { name: "rippleColor", type: "color", defaultValue: "rgba(255, 255, 255, 0.7)", description: "The color of the ripple effect." },
    { name: "rippleDuration", type: "number", defaultValue: 0.7, description: "The duration of the ripple animation in seconds." },
    { name: "className", type: "string", description: "Additional classes for the button." },
  ],
};

export default component;
