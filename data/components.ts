export interface PropData {
  name: string;
  type: string;
  defaultValue?: any;
  description: string;
}

export interface ComponentProps {
  id: number;
  name:string;
  slug: string;
  description: string;
  category: string;
  code: {
    tsx: string;
  };
  props: PropData[];
}

export const componentsData: ComponentProps[] = [
  {
    id: 1,
    name: "Shiny Button",
    slug: "shiny-button",
    description: "A button with a gradient shine effect on hover.",
    category: "Buttons",
    code: {
      tsx: `
"use client";

import { motion } from "framer-motion";
import { type FC, type ReactNode } from "react";

interface ShinyButtonProps {
  children: ReactNode;
  className?: string;
}

const ShinyButton: FC<ShinyButtonProps> = ({ children, className }) => {
  return (
    <motion.button
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className={\`relative radial-gradient-button px-6 py-3 rounded-md \${className}\`}
    >
      <span className="text-neutral-100 tracking-wide font-light h-full w-full block relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;
      `,
    },
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: 'Shiny Button', description: 'The content to display inside the button.' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for styling.' },
    ]
  },
  {
    id: 2,
    name: "Typewriter Effect",
    slug: "typewriter-effect",
    description: "Animate text as if it's being typed on screen.",
    category: "Text Effects",
    code: {
      tsx: `
"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, type FC } from "react";

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
}

const TypewriterEffect: FC<TypewriterEffectProps> = ({ texts, className }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => texts[latest % texts.length]);

  useEffect(() => {
    const controls = animate(count, texts.length, {
      type: "tween",
      duration: texts.length * 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return controls.stop;
  }, [texts.length]);

  return (
    <div className={\`flex items-center justify-center \${className}\`}>
      <motion.h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
        {displayText}
      </motion.h1>
      <motion.span
        className="ml-2 h-8 w-1 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
};

export default TypewriterEffect;
      `
    },
    props: [
      { name: 'texts', type: 'string[]', defaultValue: ['Build amazing apps.','Animate with Framer.','Style with Tailwind.'], description: 'An array of strings to cycle through.' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for the container.' },
    ]
  },
  {
    id: 3,
    name: "Aurora Background",
    slug: "aurora-background",
    description: "A beautiful, animated aurora background for your sections.",
    category: "Backgrounds",
    code: {
      tsx: `
"use client";

import { cn } from "@/lib/utils";
import { type FC, type ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const AuroraBackground: FC<AuroraBackgroundProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-full items-center justify-center bg-black text-slate-50 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              \`
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter_invert_0_dark:invert
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform\`,
              )}
          ></div>
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </main>
  );
};

export default AuroraBackground;
      `
    },
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: 'Content on Aurora', description: 'Content to display on top of the background.' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for the container.' },
    ]
  },
  {
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
  },
  {
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
  },
  {
    id: 6,
    name: "Floating Card",
    slug: "floating-card",
    description: "A card that floats and tilts based on mouse position.",
    category: "Cards",
    code: {
      tsx: `
"use client";

import { useRef, type FC, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  rotationStrength?: number;
  contentTranslateZ?: number;
  glowColor?: string;
  noiseOpacity?: number;
  glassmorphism?: boolean;
  animatedGlow?: boolean;
}

const FloatingCard: FC<FloatingCardProps> = ({
  children,
  className,
  rotationStrength = 25,
  contentTranslateZ = 20,
  glowColor = "radial-gradient(circle at center, #8B5CF6, #EC4899, #F59E0B, #10B981, #8B5CF6)",
  noiseOpacity = 0.1,
  glassmorphism = true,
  animatedGlow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = event.clientX - left - width / 2;
    const y = event.clientY - top - height / 2;

    mouseX.set(x);
    mouseY.set(y);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glowOpacity.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [rotationStrength, -rotationStrength]);
  const rotateY = useTransform(mouseX, [-150, 150], [-rotationStrength, rotationStrength]);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 30 });

  const glowStyle = {
    ...(glowColor?.includes("gradient")
      ? { 
          backgroundImage: glowColor,
          backgroundSize: animatedGlow ? "200% 200%" : "100% 100%",
        }
      : { backgroundColor: glowColor }),
  };

  const noiseBackground = \`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      className={cn(
        "relative w-72 h-96 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/20 overflow-hidden",
        glassmorphism
          ? "bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-lg"
          : "bg-gradient-to-br from-purple-900 to-indigo-900",
        className
      )}
    >
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: noiseBackground,
          opacity: noiseOpacity,
        }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        {/* The Glow */}
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            opacity: glowOpacitySpring,
            ...glowStyle,
          }}
          className={cn(
            "absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            animatedGlow && glowColor?.includes("gradient") && "animate-glow-pan"
          )}
        />
      </div>

      <div
        style={{
          transform: "translateZ(var(--content-translate-z, 20px))",
          transformStyle: "preserve-3d",
          '--content-translate-z': \`\${contentTranslateZ}px\`,
        } as React.CSSProperties}
        className="relative inset-0 flex flex-col items-center justify-center p-4 h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingCard;
      `
    },
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: 'Hover over me', description: 'The content inside the card.' },
      { name: 'rotationStrength', type: 'number', defaultValue: 25, description: 'Controls the maximum tilt angle.' },
      { name: 'contentTranslateZ', type: 'number', defaultValue: 20, description: 'How much the content "pops out" from the card.' },
      { name: 'glowColor', type: 'long-string', defaultValue: 'radial-gradient(circle at center, #8B5CF6, #EC4899, #F59E0B, #10B981, #8B5CF6)', description: 'The color or CSS gradient for the glow effect.' },
      { name: 'noiseOpacity', type: 'number', defaultValue: 0.1, description: 'The opacity of the grainy noise overlay. Set to 0 to disable.' },
      { name: 'glassmorphism', type: 'boolean', defaultValue: true, description: "Toggles the frosted glass effect on the card's background." },
      { name: 'animatedGlow', type: 'boolean', defaultValue: true, description: 'Toggles the animation of the glow gradient.' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for styling.' },
    ]
  },
  {
    id: 7,
    name: "Animated Tabs",
    slug: "animated-tabs",
    description: "Tabs with a smooth, sliding indicator.",
    category: "Navigation",
    code: {
      tsx: `
"use client";

import { useState, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  content: ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

const AnimatedTabs: FC<AnimatedTabsProps> = ({
  tabs,
  className,
  tabClassName,
  contentClassName,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="relative flex items-center justify-center border-b border-white/10">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={cn(
              "relative z-10 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === index ? "text-white" : "text-gray-400 hover:text-white",
              tabClassName
            )}
          >
            {tab.label}
            {activeTab === index && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-purple-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className={cn("relative mt-6 h-40", contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex items-center justify-center"
          >
            {typeof tabs[activeTab].content === 'string' ? (
              <p className="text-center text-gray-300">{tabs[activeTab].content}</p>
            ) : (
              tabs[activeTab].content
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedTabs;
    `
  },
  props: [
    { 
      name: 'tabs', 
      type: 'Tab[]',
      defaultValue: [
        { label: "Home", content: "This is the Home tab." },
        { label: "Docs", content: "This is the Docs tab." },
        { label: "Settings", content: "This is the Settings tab." },
      ],
      description: 'An array of tab objects with label and content.' 
    },
    { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for the main container.' },
  ]
},
  {
    id: 8,
    name: "Confetti Cannon",
    slug: "confetti-cannon",
    description: "Celebrate user actions with a burst of confetti.",
    category: "Effects",
    code: {
      tsx: `
"use client";

import { useState, useEffect, type FC } from "react";
import ReactConfetti from "react-confetti";

interface ConfettiCannonProps {
  fire: boolean;
  onComplete?: () => void;
  numberOfPieces?: number;
  colors?: string[];
}

const ConfettiCannon: FC<ConfettiCannonProps> = ({
  fire,
  onComplete,
  numberOfPieces = 200,
  colors,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!fire) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={numberOfPieces}
      colors={colors}
      recycle={false}
      gravity={0.2}
      onConfettiComplete={(confetti) => {
        if (onComplete) {
          onComplete();
        }
        if (confetti) {
          confetti.reset();
        }
      }}
      className="!fixed top-0 left-0 w-full h-full"
    />
  );
};

export default ConfettiCannon;
      `
    },
    props: [
      { name: 'numberOfPieces', type: 'number', defaultValue: 200, description: 'The number of confetti pieces to fire.' },
      { name: 'colors', type: 'string[]', defaultValue: [], description: 'An array of hex color codes for the confetti.' },
    ]
  },
  {
    id: 9,
    name: "Text Reveal",
    slug: "text-reveal",
    description: "Reveal text word-by-word with a granular animation as you scroll.",
    category: "Text Effects",
    code: {
      tsx: `
"use client";

import { type FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  stagger?: number;
}

const TextReveal: FC<TextRevealProps> = ({ text, className, stagger = 0.05 }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={cn(
        "flex flex-wrap text-2xl md:text-4xl font-bold text-white",
        className
      )}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default TextReveal;
      `
    },
    props: [
      { name: 'text', type: 'long-string', defaultValue: 'Build stunning, animated user interfaces with the power of Framer Motion and React.', description: 'The text content to reveal.' },
      { name: 'stagger', type: 'number', defaultValue: 0.05, description: 'The delay between each word appearing.' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional classes for styling the container.' },
    ]
  },
];
