import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 14,
  name: "Number Ticker",
  slug: "number-ticker",
  description: "A component that animates a number counting up to a target value.",
  category: "UI",
  code: {
    tsx: `
"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type FC } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
}

const NumberTicker: FC<NumberTickerProps> = ({
  value,
  direction = "up",
  delay = 0,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          );
        }
      }),
    [springValue]
  );

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-white",
        className
      )}
      ref={ref}
    />
  );
};

export default NumberTicker;
    `,
  },
  props: [
    {
      name: "value",
      type: "number",
      defaultValue: 1000,
      description: "The target number to animate to.",
    },
    {
      name: "direction",
      type: "string",
      defaultValue: "up",
      description: "The direction of the animation ('up' or 'down').",
    },
    {
      name: "delay",
      type: "number",
      defaultValue: 0,
      description: "The delay in seconds before the animation starts.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional classes for the number span.",
    },
  ],
};

export default component;
