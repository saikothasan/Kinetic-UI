"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  description: string;
  date: string;
  icon?: ReactNode;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const AnimatedTimeline: FC<AnimatedTimelineProps> = ({ items, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <div ref={ref} className={cn("relative w-full max-w-md mx-auto py-8", className)}>
      <svg
        width="2"
        height="100%"
        viewBox="0 0 2 1000"
        className="absolute left-[15px] top-0 h-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 1 0 V 1000"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          style={{ pathLength: pathProgress }}
          initial={{ pathLength: 0 }}
        />
      </svg>

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItemComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const TimelineItemComponent: FC<{ item: TimelineItem }> = ({ item }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="flex items-start gap-4"
    >
      <div className="relative z-10">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center ring-8 ring-black">
          {item.icon || <div className="w-3 h-3 rounded-full bg-white" />}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm text-gray-400">{item.date}</p>
        <h3 className="text-lg font-semibold text-white mt-1">{item.title}</h3>
        <p className="text-gray-300 mt-2">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default AnimatedTimeline;
