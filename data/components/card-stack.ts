import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 24,
  name: "Card Stack",
  slug: "card-stack",
  description: "A stack of cards that can be cycled through with a satisfying animation.",
  category: "Cards",
  code: {
    tsx: `
"use client";

import { useState, type FC } from "react";
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

  const cycleCards = (direction: "next" | "prev") => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      if (direction === "next") {
        const first = newCards.shift()!;
        newCards.push(first);
      } else {
        const last = newCards.pop()!;
        newCards.unshift(last);
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
    `,
  },
  props: [
    {
      name: "items",
      type: "any[]",
      description: "An array of card objects to display in the stack.",
      defaultValue: [
        { id: 0, name: "Manu Arora", designation: "Founder, Algochurn", content: "This is truly amazing." },
        { id: 1, name: "Elon Musk", designation: "Founder, SpaceX", content: "I'm going to Mars." },
        { id: 2, name: "Jeff Bezos", designation: "Founder, Amazon", content: "I'm building a clock." },
      ],
    },
    { name: "offset", type: "number", defaultValue: 10, description: "The vertical offset between cards." },
    { name: "scaleFactor", type: "number", defaultValue: 0.06, description: "The factor by which each card in the stack is scaled down." },
    { name: "className", type: "string", description: "Additional classes for the container." },
  ],
};

export default component;
