"use client";
import { Bar, BarChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

const chartData = [
  { muslim: 342, yadav: 245, obc: 123, dalit: 182, others: 382 },
];

const chartConfig = {
  muslim: {
    label: "Muslim",
    color: "#C084FC",
  },
  yadav: {
    label: "Yadav",
    color: "#2563EB",
  },
  obc: {
    label: "OBC",
    color: "#CD0AD0",
  },
  dalit: {
    label: "Dalit",
    color: "#FB923C",
  },
  others: {
    label: "Others",
    color: "#22C55E",
  },
} satisfies ChartConfig;

interface ChartItem {
  key: keyof typeof chartConfig;
  label: string;
  value: number;
  color: string;
  percent: string;
}
type ActiveProperty = keyof typeof chartConfig | "all";

export function CommunityChart() {
  const [activeProperty] = React.useState<ActiveProperty>("all");
  const data = chartData[0];
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const items: ChartItem[] = (
    Object.keys(chartConfig) as (keyof typeof chartConfig)[]
  ).map((key) => ({
    key,
    label: chartConfig[key].label,
    color: chartConfig[key].color,
    value: data[key],
    percent: ((data[key] / total) * 100).toFixed(0) + "%",
  }));
  return (
    <Card className="flex flex-col justify-betweenborder border-[#D2D5DA] shadow-none">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Caste/Community</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <ChartContainer className="h-36 w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <XAxis
              type="number"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              stackId="a"
              barSize={100}
              className="dark:text-[#1A1A1C] text-[#E4E4E7]"
              dataKey="muslim"
              fill="#C084FC"
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              background={{ fill: "currentColor", radius: 4 }} // Only Top Bar will have background else it will give render errors
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="yadav"
              fill="#2563EB"
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="obc"
              fill="#CD0AD0"
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="dalit"
              fill="#FB923C"
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="others"
              fill="#22C55E"
              overflow="visible"
            />
          </BarChart>
        </ChartContainer>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#4B5563] text-sm font-medium">
                  {item.label}
                </span>
              </div>
              <span className="text-black text-sm font-medium">
                {item.percent}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string;
    activeProperty?: ActiveProperty | null;
    glowOpacity?: number;
  }
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } = props;

  const isActive = activeProperty === "all" ? true : activeProperty === dataKey;

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={radius}
        width={width}
        height={height}
        stroke="none"
        fill={fill}
        opacity={isActive ? 1 : 0.1}
        filter={
          isActive && activeProperty !== "all"
            ? `url(#glow-chart-${dataKey})`
            : undefined
        }
      />
      <defs>
        <filter
          id={`glow-chart-${dataKey}`}
          x="-200%"
          y="-200%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </>
  );
};
