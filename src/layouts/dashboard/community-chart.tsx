"use client";
import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useMemo } from "react";
import type { CommonProps } from "../survey/types";

const chartConfig = {
  muslim: {
    label: "Muslim",
    color: "#C084FC",
  },
  hindu: {
    label: "Hindu",
    color: "#2563EB",
  },
  christian: {
    label: "Christian",
    color: "#CD0AD0",
  },
  obc: {
    label: "OBC",
    color: "#FB923C",
  },
  others: {
    label: "Others",
    color: "#22C55E",
  },
} satisfies ChartConfig;

type CommunityKey = keyof typeof chartConfig;
type ActiveProperty = CommunityKey | "all";

interface ChartItem {
  key: CommunityKey;
  label: string;
  value: number;
  color: string;
  percent: string;
}

export function CommunityChart({ surveyData = [] }: CommonProps) {
  const [activeProperty] = React.useState<ActiveProperty>("all");

  const { chartData, items, hasData } = useMemo(() => {
    const counts: Record<CommunityKey, number> = {
      muslim: 0,
      hindu: 0,
      christian: 0,
      obc: 0,
      others: 0,
    };

    surveyData.forEach((curr) => {
      const raw = curr.caste as string;
      const key = raw?.toLowerCase().trim() as CommunityKey;
      if (key && counts[key] !== undefined) {
        counts[key]++;
      } else if (raw) {
        // anything unrecognised falls into "others"
        counts.others++;
      }
    });

    const chartData = [counts]; // BarChart expects array-of-objects format

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    const items: ChartItem[] = (Object.keys(chartConfig) as CommunityKey[]).map(
      (key) => ({
        key,
        label: chartConfig[key].label,
        color: chartConfig[key].color,
        value: counts[key],
        percent: total ? `${Math.round((counts[key] / total) * 100)}%` : "0%",
      })
    );

    return { chartData, items, hasData: total > 0 };
  }, [surveyData]);

  return (
    <Card className="flex flex-col justify-between border border-[#D2D5DA] shadow-none">
      <CardHeader>
        <div className="flex flex-row justify-between mb-8">
          <CardTitle>Caste/Community</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full">
        {hasData ? (
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
                background={{ fill: "currentColor", radius: 4 }}
                overflow="visible"
              />
              <Bar stackId="a" barSize={8} shape={<CustomGradientBar activeProperty={activeProperty} />} dataKey="hindu"    fill="#2563EB" overflow="visible" />
              <Bar stackId="a" barSize={8} shape={<CustomGradientBar activeProperty={activeProperty} />} dataKey="christian" fill="#CD0AD0" overflow="visible" />
              <Bar stackId="a" barSize={8} shape={<CustomGradientBar activeProperty={activeProperty} />} dataKey="obc"       fill="#FB923C" overflow="visible" />
              <Bar stackId="a" barSize={8} shape={<CustomGradientBar activeProperty={activeProperty} />} dataKey="others"    fill="#22C55E" overflow="visible" />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-36 text-sm text-gray-400">
            No data available
          </div>
        )}

        <div className="flex flex-col gap-3 mt-4">
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