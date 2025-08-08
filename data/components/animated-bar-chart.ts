import { type ComponentProps } from "../types";

const component: ComponentProps = {
  id: 12,
  name: "Animated Bar Chart",
  slug: "animated-bar-chart",
  description: "A responsive, animated bar chart for visualizing data.",
  category: "Charts",
  code: {
    tsx: `
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { type FC } from "react";

interface ChartData {
  name: string;
  value: number;
}

interface AnimatedBarChartProps {
  data: ChartData[];
  barColor?: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded-lg border border-white/10 bg-black/50 backdrop-blur-md text-white">
        <p className="label font-bold">{\`\${label}\`}</p>
        <p className="intro text-purple-300">{\`Value: \${payload[0].value}\`}</p>
      </div>
    );
  }
  return null;
};

const AnimatedBarChart: FC<AnimatedBarChartProps> = ({
  data,
  barColor = "#a855f7", // purple-500
  className,
}) => {
  return (
    <div className={className} style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={barColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={barColor} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(255, 255, 255, 0.5)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.5)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }} 
          />
          <Bar 
            dataKey="value" 
            fill="url(#barGradient)" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedBarChart;
    `,
  },
  props: [
    {
      name: "data",
      type: "any[]",
      description: "The data array for the chart. Each object should have a 'name' and 'value' key.",
      defaultValue: [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
        { name: "Jun", value: 2390 },
      ],
    },
    {
      name: "barColor",
      type: "color",
      defaultValue: "#a855f7",
      description: "The main color for the bars' gradient.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional classes for the container.",
    },
  ],
};

export default component;
