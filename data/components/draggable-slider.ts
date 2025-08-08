import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 16,
  name: "Draggable Slider",
  slug: "draggable-slider",
  description: "An interactive slider that can be dragged to select a value.",
  category: "Interactive",
  code: {
    tsx: `
"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { useRef, useState, type FC, useEffect } from "react";

interface DraggableSliderProps {
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  className?: string;
  handleClassName?: string;
  trackClassName?: string;
  trailClassName?: string;
}

const DraggableSlider: FC<DraggableSliderProps> = ({
  minValue = 0,
  maxValue = 100,
  initialValue = 50,
  onValueChange,
  className,
  handleClassName,
  trackClassName,
  trailClassName,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(initialValue);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const trailWidth = useTransform(springX, (val) => \`\${val}px\`);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.offsetWidth;
    const newX = Math.max(0, Math.min(trackWidth, x.get() + info.offset.x));
    x.set(newX);

    const newValue = (newX / trackWidth) * (maxValue - minValue) + minValue;
    setValue(Math.round(newValue));
    if (onValueChange) {
      onValueChange(Math.round(newValue));
    }
  };

  useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      const newX = ((initialValue - minValue) / (maxValue - minValue)) * trackWidth;
      x.set(newX);
    }
  }, [initialValue, minValue, maxValue, x]);

  return (
    <div className={\`flex flex-col items-center w-full max-w-xs \${className}\`}>
      <div
        ref={trackRef}
        className={\`relative w-full h-2 rounded-full cursor-pointer bg-neutral-700 \${trackClassName}\`}
      >
        <motion.div
          className={\`absolute top-0 left-0 h-full rounded-full bg-purple-500 \${trailClassName}\`}
          style={{ width: trailWidth }}
        />
        <motion.div
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          style={{ x: springX }}
          className={\`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg cursor-grab active:cursor-grabbing \${handleClassName}\`}
        />
      </div>
      <p className="mt-4 text-lg font-semibold tabular-nums text-white">
        {value}
      </p>
    </div>
  );
};

export default DraggableSlider;
    `,
  },
  props: [
    {
      name: "minValue",
      type: "number",
      defaultValue: 0,
      description: "The minimum value of the slider.",
    },
    {
      name: "maxValue",
      type: "number",
      defaultValue: 100,
      description: "The maximum value of the slider.",
    },
    {
      name: "initialValue",
      type: "number",
      defaultValue: 50,
      description: "The initial value of the slider.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional classes for the main container.",
    },
  ],
};

export default component;
