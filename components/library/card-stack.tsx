"use client";

import { useEffect, useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardStackProps {
  items: {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
  }[];
  className?: string;
  offset?: number;
  scaleFactor?: number;
}

const CardStack: FC<CardStackProps> = ({
  items,
  className,
  offset = 10,
  scaleFactor = 0.06,
}) => {
  const [cards, setCards] = useState(items);
  const [activeIndex, setActiveIndex] = useState(0);

  const cycleCards = (direction: "next" | "prev") => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      if (direction === "next") {
        const first = newCards.shift()!;
        newCards.push(first);
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else {
        const last = newCards.pop()!;
        newCards.unshift(last);
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      }
      return newCards;
    });
  };

  return (
    <div className={cn("relative h-80 w-full max-w-sm", className)}>
      <AnimatePresence>
        {cards.map((card, index) => {
          const isTop = index === cards.length - 1;
          return (
            <motion.div
              key={card.id}
              className="absolute bg-black/50 border border-white/10 backdrop-blur-md w-full h-full rounded-2xl p-6 shadow-xl flex flex-col justify-between"
              style={{
                transformOrigin: "top center",
              }}
              initial={{
                scale: 1 - index * scaleFactor,
                top: index * -offset,
                opacity: isTop ? 1 : 0.5,
              }}
              animate={{
                scale: 1 - index * scaleFactor,
                top: index * -offset,
                opacity: isTop ? 1 : 0.5,
              }}
              exit={{
                top: -offset * 2,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="font-normal text-neutral-200">
                {card.content}
              </div>
              <div>
                <p className="text-white font-medium">{card.name}</p>
                <p className="text-neutral-400 font-normal">
                  {card.designation}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button onClick={() => cycleCards("prev")} variant="outline" size="icon" className="rounded-full bg-black/50 hover:bg-white/10">
          <ChevronLeft />
        </Button>
        <Button onClick={() => cycleCards("next")} variant="outline" size="icon" className="rounded-full bg-black/50 hover:bg-white/10">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CardStack;
