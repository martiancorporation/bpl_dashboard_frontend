"use client";

import { Bar, BarChart, XAxis, LabelList, Cell, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { choice: "Yes", label: "Yes, Firm decision", count: 342 },
  { choice: "One", label: "Leaning one party", count: 876 },
  { choice: "Thinking", label: "Still thinking", count: 512 },
  { choice: "Wont", label: "Won’t vote", count: 629 }
];

const chartConfig = {
  Yes: { label: "Yes, Firm decision", color: "#FFBD45" },
  One: { label: "Leaning one party", color: "#235FE3" },
  Thinking: { label: "Still thinking", color: "#20BC5B" },
  Wont: { label: "Won’t vote", color: "#B77EF3" },
} satisfies ChartConfig;

export function VotingChart() {
  return (
    <Card className="w-full rounded-[10px] border border-[#D2D5DA] shadow-none col-span-2">
      <CardHeader className="flex justify-between items-center space-y-0 py-2 mb-4 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Whom to vote for on 11 November?</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
          >
            <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              width={40}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="issues" />}
            />
            <Bar dataKey="count" radius={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.choice as keyof typeof chartConfig].color}
                />
              ))}
              <LabelList dataKey="count" position="top" fontSize={12} fill="#374151" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
