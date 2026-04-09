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
  { reason: " leadersImage", label: "Leader's Image", count: 275, fill: "#235FE3" },
  { reason: "casteOrCommunity", label: "Caste/Community", count: 200, fill: "#B77EF3" },
  { reason: "developmentWork", label: "Development Work", count: 187, fill: "#20BC5B" },
  { reason: "partyIdeology", label: "Party Ideology", count: 187, fill: "#EF8C3A" },
  { reason: "religion", label: "Religion", count: 187, fill: "#C30AC9" },
  { reason: "other", label: "Others", count: 187, fill: "#FFBD45" },
];

const chartConfig = {
  reason: {
    label: "Leaders Image",
  },
  leadersImage: {
    label: "Leaders Image",
    color: "#235FE3",
  },
  casteOrCommunity: {
    label: "Caste or Community",
    color: "#B77EF3",
  },
  developmentWork: {
    label: "Development Work",
    color: "#20BC5B",
  },
  partyIdeology: {
    label: "Party Ideology",
    color: "#EF8C3A",
  },
  religion: {
    label: "Religion",
    color: "#C30AC9",
  },
  other: {
    label: "Others",
    color: "#FFBD45",
  }
} satisfies ChartConfig;


export function ReasonChart() {
  const total = chartData.reduce((sum, d) => sum + d.count, 0);
  const items = chartData.map((d) => ({
    label: d.label,
    color: d.fill,
    percent: ((d.count / total) * 100).toFixed(0) + "%",
  }));
  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none col-span-3">
      <CardHeader className="flex justify-between items-center space-y-0 py-2 mb-4 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>What is reason to voting</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background w-fit aspect-square h-[250px] mt-6" 
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="reason" hideLabel />}
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
        <div className="flex flex-col gap-8 w-full">
          {items.map((item) => (
            <div key={item.label} className="flex items-center w-full justify-between">
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
