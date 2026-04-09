"use client";

import { useMemo } from "react";
import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CommonProps } from "../survey/types";

const chartConfig = {
  age_group: { label: "Age Group" },
  "18-25": { label: "18-25", color: "#FB923C" },
  "26-35": { label: "26-35", color: "#C084FC" },
  "36-50": { label: "36-50", color: "#2563EB" },
  "50+": { label: "50+", color: "#22C55E" },
} satisfies ChartConfig;

const COLORS: Record<string, string> = {
  "18-25": "#FB923C",
  "26-35": "#C084FC",
  "36-50": "#2563EB",
  "50+": "#22C55E",
};

export function AgeGroupChart({ surveyData = [] }: CommonProps)  {
  const { chartData, items, hasData } = useMemo(() => {
  type AgeGroup = "18-25" | "26-35" | "36-50" | "50+";

  const counts: Record<AgeGroup, number> = {
    "18-25": 0,
    "26-35": 0,
    "36-50": 0,
    "50+": 0,
  };

  surveyData.forEach((curr) => {
    const key = curr.age_group as AgeGroup;
    if (key && counts[key] !== undefined) {
      counts[key]++;
    }
  });

  const chartData = (Object.entries(counts) as [AgeGroup, number][])
    .filter(([, count]) => count > 0)
    .map(([age_group, count]) => ({
      age_group,
      count,
      fill: COLORS[age_group],
    }));

  const total = chartData.reduce((sum, d) => sum + d.count, 0);

  const items = chartData.map((d) => ({
    label: d.age_group,
    color: d.fill,
    percent: total
      ? `${Math.round((d.count / total) * 100)}%`
      : "0%",
    count: d.count,
  }));

  return {
    chartData,
    items,
    hasData: chartData.length > 0,
  };
}, [surveyData]);

  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Age Group</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent nameKey="age_group" hideLabel />
                }
              />
              <Pie
                data={chartData}
                dataKey="count"
                innerRadius={0}
                stroke="none"
              >
                <LabelList
                  dataKey="count"
                  fontSize={12}
                  fontWeight={500}
                  fill="currentColor"
                  formatter={(value: number) => value.toString()}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-sm text-gray-400">
            No data available
          </div>
        )}

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
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
};