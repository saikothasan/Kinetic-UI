"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { componentsData } from "@/data/components";
import ComponentCard from "./component-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ComponentShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(componentsData.map((c) => c.category))],
    []
  );

  const filteredComponents = useMemo(() => {
    return componentsData.filter((component) => {
      const matchesCategory =
        activeCategory === "All" || component.category === activeCategory;
      const matchesSearch =
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Zero-cost all-the-cool
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Everything you need to add flair to your websites.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="relative w-full md:max-w-xs">
          <Input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/30 border-white/10 rounded-full focus:ring-purple-500 focus:ring-offset-black"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-purple-600 text-white hover:bg-purple-700 rounded-full"
                  : "bg-transparent border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white rounded-full"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} {...component} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
