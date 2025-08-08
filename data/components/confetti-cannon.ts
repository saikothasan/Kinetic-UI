import { type ComponentProps } from "../types";

const component: ComponentProps = {
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
};

export default component;
