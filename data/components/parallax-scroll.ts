import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 4,
  name: "Parallax Scroll",
  slug: "parallax-scroll",
  description: "Create a 3D effect as you scroll down the page.",
  category: "Scroll Effects",
  code: {
    tsx: `
"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, type FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ParallaxScrollProps {
  images: string[];
  className?: string;
  speeds?: [number, number, number];
}

const ParallaxScroll: FC<ParallaxScrollProps> = ({
  images,
  className,
  speeds = [-200, 200, -150],
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, speeds[0]]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, speeds[1]]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, speeds[2]]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-20 px-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
              <Image
                src={el || "/placeholder.svg"}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <Image
                src={el || "/placeholder.svg"}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <Image
                src={el || "/placeholder.svg"}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
     `
  },
  props: [
    { name: 'images', type: 'string[]', defaultValue: [], description: 'An array of image URLs to display.' },
    { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for the container.' },
    { name: 'speeds', type: 'number[]', defaultValue: [-200, 200, -150], description: 'An array of three numbers representing the vertical translation distance for each column.' },
  ]
};

export default component;
