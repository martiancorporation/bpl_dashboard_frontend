"use client";

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

const chartData = [
  { gender: "male", count: 275, fill: "#FB923C" },
  { gender: "female", count: 200, fill: "#C084FC" },
  { gender: "others", count: 187, fill: "#2563EB" },
];

const chartConfig = {
  gender: {
    label: "Gender",
  },
  male: {
    label: "Male",
    color: "#FB923C",
  },
  female: {
    label: "Female",
    color: "#C084FC",
  },
  others: {
    label: "Others",
    color: "#2563EB",
  }
} satisfies ChartConfig;


export function GenderChart() {
  const total = chartData.reduce((sum, d) => sum + d.count, 0);
  const items = chartData.map((d) => ({
    label: d.gender,
    color: d.fill,
    percent: ((d.count / total) * 100).toFixed(0) + "%",
  }));
  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Gender
        </CardTitle>
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
