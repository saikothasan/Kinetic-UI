"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ComponentProps } from "@/data/components";
import { LivePreview } from "./live-preview";

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ComponentCard({ name, description, slug }: ComponentProps) {
  return (
    <Link href={`/components/${slug}`} className="block">
      <motion.div
        layout
        className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-md shadow-lg h-full flex flex-col"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
        <div className="h-60 w-full overflow-hidden pointer-events-none">
          <LivePreview slug={slug} className="scale-[0.8]"/>
        </div>
        <div className="p-6 border-t border-white/10 mt-auto">
          <h3 className="font-bold text-lg text-white">{name}</h3>
          <p className="mt-2 text-sm text-gray-400">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}
