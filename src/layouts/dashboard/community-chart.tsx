"use client";

import React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { AnalyticsData } from "./types";

interface CommunityChartProps {
  analytics?: AnalyticsData;
}

type CasteKey = keyof NonNullable<AnalyticsData["caste"]>;
type ActiveProperty = CasteKey | "all";

export function CommunityChart({ analytics }: CommunityChartProps) {
  // Extract caste data from analytics
  const casteData = analytics?.caste || {};

  // Define fixed color mapping for castes
  const chartConfig = {
    muslim: { label: "Muslim", color: "#C084FC" },
    yadav: { label: "Yadav", color: "#2563EB" },
    obc: { label: "OBC", color: "#CD0AD0" },
    dalit: { label: "Dalit", color: "#FB923C" },
    others: { label: "Others", color: "#22C55E" },
  } satisfies ChartConfig;

  // Prepare single data row for the bar chart
  const chartData = [casteData];

  const total = Object.values(casteData).reduce((a, b) => a + (b || 0), 0);
  const [activeProperty] = React.useState<ActiveProperty>("all");

  const items = (Object.keys(chartConfig) as (keyof typeof chartConfig)[])
    .filter((key) => casteData[key] !== undefined)
    .map((key) => ({
      key,
      label: chartConfig[key].label,
      color: chartConfig[key].color,
      value: casteData[key] || 0,
      percent:
        total > 0 ? `${((casteData[key]! / total) * 100).toFixed(0)}%` : "0%",
    }));

  return (
    <Card className="flex flex-col justify-between border border-[#D2D5DA] shadow-none">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Caste / Community</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full">
        <ChartContainer className="h-20 w-full my-auto" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <XAxis type="number" tickLine={false} axisLine={false} hide />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            {items.map((item, i) => (
              <Bar
                key={item.key}
                stackId="a"
                barSize={i === 0 ? 100 : 8}
                dataKey={item.key}
                fill={item.color}
                shape={<CustomGradientBar activeProperty={activeProperty} />}
                background={
                  i === 0 ? { fill: "currentColor", radius: 4 } : undefined
                }
                overflow="visible"
              />
            ))}
          </BarChart>
        </ChartContainer>

        {/* Legend section */}
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

// ✅ Reusable bar with glow effect
const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string;
    activeProperty?: ActiveProperty | null;
    glowOpacity?: number;
  }
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } = props;

  const isActive = activeProperty === "all" || activeProperty === dataKey;

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
