"use client";

import { type FC } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Sparkles, Share2, X, PanelLeft, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ComponentShowcase from "@/components/component-showcase";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AnimatedBit: FC<{
  children: React.ReactNode;
  className?: string;
  animation: object;
}> = ({ children, className, animation }) => (
  <motion.div
    className={cn(
      "absolute rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 shadow-[0_0_20px_5px] shadow-purple-500/20",
      className
    )}
    {...animation}
  >
    {children}
  </motion.div>
);

const DotPattern = () => (
  <div className="w-full h-full p-4">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)",
        backgroundSize: "1rem 1rem",
      }}
    />
  </div>
);

const GridPattern = () => (
  <div className="w-full h-full p-4">
    <div
      className="w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, #6d28d9 1px, transparent 1px), linear-gradient(to bottom, #6d28d9 1px, transparent 1px)",
        backgroundSize: "1.5rem 1.5rem",
      }}
    />
  </div>
);

const CodeSnippet = () => (
  <div className="w-full h-full p-4 font-mono text-xs text-purple-300/80 overflow-hidden">
    <p>{`const AboutPage = () => (`}</p>
    <p>{`  <div>`}</p>
    <p>{`    <h1>About Us</h1>`}</p>
    <p>{`    <p>We are developers.</p>`}</p>
    <p>{`  </div>`}</p>
    <p>{`});`}</p>
    <p>{`export default AboutPage;`}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "url('/glowing-fluid-abstract.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/50" />


      <header className="relative z-20 flex items-center justify-between p-4 md:p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <span className="text-lg font-bold hidden md:inline-block">Kinetic UI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Home
          </a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Docs
          </a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Showcase
          </a>
        </nav>
        <Button className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20">
          <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
          Star on GitHub
          <span className="ml-2 rounded-md bg-white/10 px-2 py-0.5 text-xs">18.6k</span>
        </Button>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-10 text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
            Build stunning UIs with Kinetic UI
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
            Over 100 animated, interactive, and customizable React components, ready to be dropped into your projects.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg px-8 py-6 rounded-full shadow-[0_0_20px] shadow-purple-500/50 transition-shadow">
              Browse Components
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <AnimatedBit
            className="w-48 h-48 top-[15%] right-[15%]"
            animation={{
              initial: { opacity: 0, y: 50, rotate: -10 },
              animate: { opacity: 1, y: 0, rotate: -5 },
              transition: { duration: 0.8, delay: 0.2, ease: "easeOut" },
            }}
          >
            <DotPattern />
          </AnimatedBit>
          <AnimatedBit
            className="w-40 h-40 top-[40%] right-[25%]"
            animation={{
              initial: { opacity: 0, y: 50, rotate: 20 },
              animate: { opacity: 1, y: 0, rotate: 15 },
              transition: { duration: 0.8, delay: 0.4, ease: "easeOut" },
            }}
          >
            <CodeSnippet />
          </AnimatedBit>
          <AnimatedBit
            className="w-32 h-32 top-[60%] right-[18%]"
            animation={{
              initial: { opacity: 0, y: 50, rotate: -20 },
              animate: { opacity: 1, y: 0, rotate: -15 },
              transition: { duration: 0.8, delay: 0.6, ease: "easeOut" },
            }}
          >
            <GridPattern />
          </AnimatedBit>
        </div>
      </div>

      <ComponentShowcase />
    </div>
  );
}
