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
import { BentoGrid, BentoGridItem } from "./library/bento-grid";
import SpotlightCard from "./library/spotlight-card";
import InteractiveGlobe from "./library/interactive-globe";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from 'lucide-react';

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

const BentoGridDemo = (props: any) => {
  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />
  );
  const items = [
    {
      title: "Automated Workflows",
      description: "Create and manage complex workflows with ease.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Interactive Previews",
      description: "See your changes live as you build.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Real-time Collaboration",
      description: "Work with your team in the same space.",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "AI-Powered Suggestions",
      description: "Get smart suggestions to improve your code.",
      header: <Skeleton />,
      className: "md:col-span-2",
      icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
    },
  ];
  return (
    <BentoGrid {...props}>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};

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
  "bento-grid": (props) => <BentoGridDemo {...props} />,
  "spotlight-card": (props) => <SpotlightCard {...props} />,
  "interactive-globe": (props) => <InteractiveGlobe {...props} />,
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
    },
    "bento-grid": {},
    "spotlight-card": {
      children: (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">Spotlight</h3>
          <p className="mt-2 text-gray-400">Hover over this card to see the effect.</p>
        </div>
      )
    },
    "interactive-globe": {
      points: [
        { lat: 34.0522, lon: -118.2437, city: 'Los Angeles', country: 'USA' },
        { lat: 40.7128, lon: -74.0060, city: 'New York', country: 'USA' },
        { lat: 51.5074, lon: -0.1278, city: 'London', country: 'UK' },
        { lat: 35.6895, lon: 139.6917, city: 'Tokyo', country: 'Japan' },
        { lat: -33.8688, lon: 151.2093, city: 'Sydney', country: 'Australia' },
      ]
    }
  };

  const props = { ...defaultProps[slug], ...dynamicProps };

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <Component {...props} />
    </div>
  );
}
