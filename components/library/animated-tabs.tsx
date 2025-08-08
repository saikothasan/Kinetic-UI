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
