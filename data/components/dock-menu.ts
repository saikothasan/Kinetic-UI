import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 5,
  name: "Dock Menu",
  slug: "dock-menu",
  description: "A macOS-style dock menu with magnification.",
  category: "Navigation",
  code: {
    tsx: `
"use client";

import { type FC, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code, Home, Settings, Mail, BarChart2 } from 'lucide-react';

interface DockMenuProps {
  magnification?: number;
  disabled?: boolean;
}

const icons = [
  <Home key="home" />,
  <Mail key="mail" />,
  <BarChart2 key="analytics" />,
  <Code key="code" />,
  <Settings key="settings" />,
];

const DockMenu: FC<DockMenuProps> = ({ magnification = 50, disabled = false }) => {
  const mouseX = useMotionValue(Infinity);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    mouseX.set(e.pageX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-end justify-center h-16 gap-3 pb-3 px-4 rounded-full border border-white/10 bg-black/30"
    >
      {icons.map((icon, i) => (
        <DockIcon key={i} mouseX={mouseX} magnification={magnification}>
          {icon}
        </DockIcon>
      ))}
    </motion.div>
  );
};

interface DockIconProps {
  mouseX: ReturnType<typeof useMotionValue>;
  magnification: number;
  children: React.ReactNode;
}

const DockIcon: FC<DockIconProps> = ({ mouseX, magnification, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [1, 1 + magnification / 100, 1]);
  
  const scale = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="p-3 rounded-full bg-white/10 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default DockMenu;
     `
  },
  props: [
    { name: 'magnification', type: 'number', defaultValue: 50, description: 'The percentage to magnify icons on hover.' },
    { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disable the hover effect.' },
  ]
};

export default component;
