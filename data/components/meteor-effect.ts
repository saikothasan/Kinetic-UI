import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 13,
  name: "Meteor Effect",
  slug: "meteor-effect",
  description: "Adds animated shooting stars to the background of any element.",
  category: "Backgrounds",
  code: {
    tsx: `
"use client";

import { cn } from "@/lib/utils";
import { type FC } from "react";

interface MeteorEffectProps {
  number?: number;
  className?: string;
}

const MeteorEffect: FC<MeteorEffectProps> = ({
  number = 20,
  className,
}) => {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </>
  );
};

export default MeteorEffect;
    `,
  },
  props: [
    {
      name: "number",
      type: "number",
      defaultValue: 20,
      description: "The number of meteors to display.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional classes for the meteor elements.",
    },
  ],
};

export default component;
