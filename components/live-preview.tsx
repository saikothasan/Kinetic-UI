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
import AnimatedBarChart from "./library/animated-bar-chart";
import MeteorEffect from "./library/meteor-effect";
import NumberTicker from "./library/number-ticker";
import AnimatedGradientText from "./library/animated-gradient-text";
import DraggableSlider from "./library/draggable-slider";
import InteractiveGlobe from "./library/interactive-globe";
import AnimatedTimeline from "./library/animated-timeline";
import LampEffect from "./library/lamp-effect";
import MagicInput from "./library/magic-input";
import RippleButton from "./library/ripple-button";
import GridDotBackground from "./library/grid-dot-background";
import FollowerPointer from "./library/follower-pointer";
import CardStack from "./library/card-stack";
import EvervaultCard from "./library/evervault-card";
import SparklesEffect from "./library/sparkles-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, Milestone, Flag, CheckCircle } from 'lucide-react';

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
  "animated-bar-chart": (props) => <AnimatedBarChart {...props} />,
  "meteor-effect": (props) => <MeteorEffect {...props} />,
  "number-ticker": (props) => <NumberTicker {...props} />,
  "animated-gradient-text": (props) => <AnimatedGradientText {...props} />,
  "draggable-slider": (props) => <DraggableSlider {...props} />,
  "interactive-globe": (props) => <InteractiveGlobe {...props} />,
  "animated-timeline": (props) => <AnimatedTimeline {...props} />,
  "lamp-effect": (props) => <LampEffect {...props} />,
  "magic-input": (props) => <MagicInput {...props} />,
  "ripple-button": (props) => <RippleButton {...props} />,
  "grid-dot-background": (props) => <GridDotBackground {...props} />,
  "follower-pointer": (props) => <FollowerPointer {...props} />,
  "card-stack": (props) => <CardStack {...props} />,
  "evervault-card": (props) => <EvervaultCard {...props} />,
  "sparkles-effect": (props) => <SparklesEffect {...props} />,
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
    "animated-bar-chart": {
      data: [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
      ]
    },
    "meteor-effect": {
      number: 20,
    },
    "number-ticker": {
      value: 18600,
    },
    "animated-gradient-text": {
      text: "Animated Gradient",
      className: "text-4xl font-bold",
    },
    "draggable-slider": {
      initialValue: 50,
    },
    "interactive-globe": {},
    "animated-timeline": {
      items: [
        { date: "Jan 2023", title: "Project Kickoff", description: "The project officially started.", icon: <Rocket className="h-4 w-4 text-white" /> },
        { date: "Mar 2023", title: "Alpha Release", description: "First version released to a closed group.", icon: <Milestone className="h-4 w-4 text-white" /> },
        { date: "Jun 2023", title: "Beta Launch", description: "Public beta available for testing.", icon: <Flag className="h-4 w-4 text-white" /> },
        { date: "Sep 2023", title: "Official Launch", description: "Version 1.0 is live!", icon: <CheckCircle className="h-4 w-4 text-white" /> },
      ]
    },
    "lamp-effect": {
      children: (
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Lamp Effect</h2>
          <p className="mt-4 text-gray-400">Move your mouse to see the light.</p>
        </div>
      ),
      containerClassName: "rounded-2xl w-full max-w-2xl h-96"
    },
    "magic-input": {
      placeholder: "Focus me..."
    },
    "ripple-button": {
      children: "Click Me"
    },
    "grid-dot-background": {
      children: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Hover Me</h2>
            <p className="mt-4 text-gray-400">The dots will illuminate.</p>
          </div>
        </div>
      ),
      className: "w-full h-96 rounded-2xl"
    },
    "follower-pointer": {
      children: (
        <div className="w-full h-96 rounded-2xl border border-dashed border-white/10 bg-black/20 flex items-center justify-center">
          <p className="text-gray-400">Hover anywhere in this box</p>
        </div>
      ),
      title: "React Bits"
    },
    "card-stack": {
      items: [
        { id: 0, name: "Manu Arora", designation: "Founder, Algochurn", content: "This is truly amazing, the best thing since sliced bread." },
        { id: 1, name: "Elon Musk", designation: "Founder, SpaceX", content: "I'm going to Mars with these components." },
        { id: 2, name: "Jeff Bezos", designation: "Founder, Amazon", content: "My new clock will be built using this library." },
      ]
    },
    "evervault-card": {
      children: (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">Evervault</h3>
          <p className="mt-2 text-gray-400">Hover to reveal the magic.</p>
        </div>
      )
    },
    "sparkles-effect": {
      children: (
        <h1 className="text-4xl font-bold text-center text-white">
          Sparkles
        </h1>
      ),
      className: "w-full h-full flex items-center justify-center"
    },
  };

  const props = { ...defaultProps[slug], ...dynamicProps };

  const PreviewWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  );

  if (slug === 'meteor-effect') {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <MeteorEffect {...props} />
        <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
          Meteors
        </div>
      </div>
    )
  }
  
  if (slug === 'number-ticker') {
    return (
      <PreviewWrapper>
        <p className="text-4xl font-bold">
          <NumberTicker {...props} />
        </p>
      </PreviewWrapper>
    )
  }

  if (slug === 'interactive-globe') {
    return (
      <div className="w-full h-96">
        <InteractiveGlobe {...props} />
      </div>
    )
  }

  if (slug === 'animated-timeline') {
    return (
      <div className="h-96 w-full overflow-y-scroll rounded-lg border border-dashed border-white/10 bg-black/20">
        <AnimatedTimeline {...props} />
      </div>
    )
  }

  if (slug === 'lamp-effect') {
    return (
      <LampEffect {...props} />
    )
  }

  if (slug === 'grid-dot-background') {
    return (
      <GridDotBackground {...props} />
    )
  }

  return (
    <PreviewWrapper>
      <Component {...props} />
    </PreviewWrapper>
  );
}
