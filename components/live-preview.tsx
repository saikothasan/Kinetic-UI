"use client";

import { useState } from "react";
import ShinyButton from "./library/shiny-button";
import TypewriterEffect from "./library/typewriter-effect";
import AuroraBackground from "./library/aurora-background";
import DockMenu from "./library/dock-menu";
import ParallaxScroll from "./library/parallax-scroll";
import FloatingCard from "./library/floating-card";
import AnimatedTabs from "./library/animated-tabs";
import ConfettiCannon from "./library/confetti-cannon";
import TextReveal from "./library/text-reveal";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

interface LivePreviewProps {
  slug: string;
  className?: string;
  dynamicProps?: { [key: string]: any };
}

const typewriterTexts = [
  "Build amazing apps.",
  "Animate with Framer.",
  "Style with Tailwind.",
  "Powered by Next.js.",
];

const placeholderImages = Array.from({ length: 15 }, (_, i) => `/placeholder.svg?width=500&height=${Math.floor(Math.random() * 200) + 400}&query=abstract+art+${i}`);

const ConfettiCannonWrapper = (props: any) => {
  const [fire, setFire] = useState(false);
  return (
    <>
      <Button onClick={() => setFire(true)}>
        <Sparkles className="h-4 w-4 mr-2" />
        Fire Confetti!
      </Button>
      <ConfettiCannon {...props} fire={fire} onComplete={() => setFire(false)} />
    </>
  );
};

const TextRevealWrapper = (props: any) => (
  <div className="h-96 w-full max-w-lg overflow-y-scroll p-8 border border-dashed border-white/10 rounded-lg bg-black/20">
    <div className="h-48" />
    <TextReveal {...props} />
    <div className="h-48" />
  </div>
);

const componentMap: { [key: string]: React.FC<any> } = {
  "shiny-button": (props) => <ShinyButton {...props} />,
  "typewriter-effect": (props) => <TypewriterEffect {...props} />,
  "aurora-background": (props) => <AuroraBackground {...props} />,
  "dock-menu": (props) => <DockMenu {...props} />,
  "parallax-scroll": (props) => <ParallaxScroll {...props} />,
  "floating-card": (props) => <FloatingCard {...props} />,
  "animated-tabs": (props) => <AnimatedTabs {...props} />,
  "confetti-cannon": (props) => <ConfettiCannonWrapper {...props} />,
  "text-reveal": (props) => <TextRevealWrapper {...props} />,
};

const DefaultPreview = () => (
  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
    Preview not available yet.
  </div>
);

export function LivePreview({ slug, className, dynamicProps = {} }: LivePreviewProps) {
  const Component = componentMap[slug] || DefaultPreview;

  const defaultProps: { [key:string]: any } = {
    "shiny-button": { children: "Shiny Button" },
    "typewriter-effect": { texts: typewriterTexts },
    "aurora-background": { children: <div className="font-bold text-3xl text-center">Content on Aurora</div> },
    "dock-menu": {},
    "parallax-scroll": { images: placeholderImages },
    "floating-card": { 
      children: (
        <div className="text-center text-white">
          <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">React</p>
          <p className="mt-2 text-sm text-gray-300">The Library for Web and Native User Interfaces</p>
        </div>
      )
    },
    "animated-tabs": {
      tabs: [
        { label: "Home", content: "This is the Home tab." },
        { label: "Docs", content: "This is the Docs tab." },
        { label: "Settings", content: "This is the Settings tab." },
      ]
    },
    "confetti-cannon": {
      numberOfPieces: 200,
      colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
    },
    "text-reveal": {
      text: "Build stunning, animated user interfaces with the power of Framer Motion and React."
    }
  };

  const props = { ...defaultProps[slug], ...dynamicProps };

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <Component {...props} />
    </div>
  );
}
