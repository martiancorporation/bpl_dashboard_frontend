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
  { issues: "Roads", count: 342 },
  { issues: "Electricity", count: 876 },
  { issues: "Health", count: 512 },
  { issues: "Jobs", count: 629 },
  { issues: "Education", count: 458 },
  { issues: "Law & Order", count: 781 },
  { issues: "Others", count: 394 },
];

const chartConfig = {
  Roads: { label: "Roads", color: "#C084FC" },
  Electricity: { label: "Electricity", color: "#2563EB" },
  Health: { label: "Health", color: "#FB923C" },
  Jobs: { label: "Jobs", color: "#22C55E" },
  Education: { label: "Education", color: "#CD0AD0" },
  "Law & Order": { label: "Law & Order", color: "#FFF04A" },
  Others: { label: "Others", color: "#3ADDE3" },
} satisfies ChartConfig;

export function IssuesChart() {
  return (
    <Card className="w-full rounded-[10px] border border-[#D2D5DA] shadow-none col-span-2">
      <CardHeader className="flex justify-between items-center space-y-0 border-b sm:flex-row px-4 py-2 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Trending issues to solve</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
          >
            <XAxis dataKey="issues" tickLine={false} tickMargin={10} axisLine={false} />
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
                  fill={chartConfig[entry.issues as keyof typeof chartConfig].color}
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
