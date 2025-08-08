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
