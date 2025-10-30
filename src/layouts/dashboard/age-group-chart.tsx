"use client";

import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { age_group: "18-25", count: 275, fill: "#FB923C" },
  { age_group: "26-35", count: 200, fill: "#C084FC" },
  { age_group: "36-50", count: 187, fill: "#2563EB" },
  { age_group: "50+", count: 187, fill: "#22C55E" },
];

const chartConfig = {
  age_group: {
    label: "Age Group",
  },
  "18-25": {
    label: "18-25",
    color: "#FB923C",
  },
  "26-35": {
    label: "26-35",
    color: "#C084FC",
  },
  "36-50": {
    label: "36-50",
    color: "#2563EB",
  },
  "50+": {
    label: "50+",
    color: "#22C55E",
  },
} satisfies ChartConfig;

export function AgeGroupChart() {
  const total = chartData.reduce((sum, d) => sum + d.count, 0);
  const items = chartData.map((d) => ({
    label: d.age_group,
    color: d.fill,
    percent: ((d.count / total) * 100).toFixed(0) + "%",
  }));
  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Age Group</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="age_group" hideLabel />}
            />
            <Pie
              data={chartData}
              innerRadius={0}
              dataKey="count"
              radius={10}
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
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
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
