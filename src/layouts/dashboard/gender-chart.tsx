"use client";
import { LabelList, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { AnalyticsData } from "./types";

interface GenderChartProps {
  analytics?: AnalyticsData;
}

export function GenderChart({ analytics }: GenderChartProps) {
  // Default colors per gender
  const genderColors: Record<string, string> = {
    male: "#FB923C",
    female: "#C084FC",
    other: "#2563EB",
  };

  // Map analytics data -> chart data
  const chartData =
    analytics?.gender?.map((item) => ({
      gender: item.gender,
      count: item.count,
      fill: genderColors[item.gender] || "#9CA3AF",
    })) || [];

  const total = chartData.reduce((sum, d) => sum + d.count, 0);

  // Derived items for percentage display
  const items = chartData.map((d) => ({
    label: d.gender,
    color: d.fill,
    percent: total > 0 ? `${((d.count / total) * 100).toFixed(0)}%` : "0%",
  }));

  const chartConfig = {
    gender: { label: "Gender" },
    male: { label: "Male", color: "#FB923C" },
    female: { label: "Female", color: "#C084FC" },
    other: { label: "Other", color: "#2563EB" },
  } satisfies ChartConfig;

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
              innerRadius={55}
              dataKey="count"
              outerRadius={100}
              paddingAngle={3}
            >
              <LabelList
                dataKey="count"
                stroke="none"
                fontSize={12}
                fontWeight={500}
                fill="currentColor"
                formatter={(value: number) => value.toString()}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
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
}
