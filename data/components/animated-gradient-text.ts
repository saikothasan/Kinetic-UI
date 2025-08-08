import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 15,
  name: "Animated Gradient Text",
  slug: "animated-gradient-text",
  description: "Text with a beautiful, animated gradient background.",
  category: "Text Effects",
  code: {
    tsx: `
"use client";

import { cn } from "@/lib/utils";
import { type FC } from "react";

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
}

const AnimatedGradientText: FC<AnimatedGradientTextProps> = ({
  text,
  className,
  gradient = "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0ff,#141316)]",
}) => {
  return (
    <span
      className={cn(
        "relative inline-block text-transparent bg-clip-text animate-gradient-pan",
        gradient,
        className
      )}
      style={{
        backgroundSize: "200% auto",
      }}
    >
      {text}
    </span>
  );
};

export default AnimatedGradientText;
    `,
  },
  props: [
    {
      name: "text",
      type: "string",
      defaultValue: "Animated Gradient",
      description: "The text to display.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional classes for the text span.",
    },
    {
      name: "gradient",
      type: "long-string",
      defaultValue: "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0ff,#141316)]",
      description: "Tailwind CSS classes for the background gradient.",
    },
  ],
};

export default component;
