"use client";

import { useMemo } from "react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CommonProps } from "../survey/types";

const chartConfig = {
  gender: { label: "Gender" },
  male: { label: "Male", color: "#FB923C" },
  female: { label: "Female", color: "#C084FC" },
  other: { label: "Other", color: "#2563EB" },
} satisfies ChartConfig;

const COLORS: Record<string, string> = {
  male: "#FB923C",
  female: "#C084FC",
  other: "#2563EB",
};

export function GenderChart({ surveyData = [] }: CommonProps)  {
  const { chartData, items } = useMemo(() => {
  type Gender = "male" | "female" | "other";

  const counts: Record<Gender, number> = {
    male: 0,
    female: 0,
    other: 0,
  };

  surveyData.forEach((curr) => {
    const key = curr.gender?.toLowerCase() as Gender;
    if (key && key in counts) {
      counts[key]++;
    }
  });

  const chartData = (Object.entries(counts) as [Gender, number][])
    .filter(([, count]) => count > 0)
    .map(([gender, count]) => ({
      gender,
      count,
      fill: COLORS[gender],
    }));

  const total = chartData.reduce((sum, d) => sum + d.count, 0);

  const items = chartData.map((d) => ({
    label: d.gender,
    color: d.fill,
    percent: total
      ? `${Math.round((d.count / total) * 100)}%`
      : "0%",
    count: d.count,
  }));

  return { chartData, items };
}, [surveyData]);

  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gender</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="gender" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              innerRadius={55}
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
                <span className="text-[#4B5563] text-sm font-medium capitalize">
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