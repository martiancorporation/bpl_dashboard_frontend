"use client";

import { Bar, BarChart, XAxis, LabelList, Cell, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// Define consistent chart categories (display labels + mapping to API keys)
const defaultChartData = [
  { choice: "firm", label: "Yes, Firm decision", count: 0 },
  { choice: "leaning", label: "Leaning one party", count: 0 },
  { choice: "thinking", label: "Still thinking", count: 0 },
  { choice: "wont_vote", label: "Won’t vote", count: 0 },
];

const chartConfig = {
  firm: { label: "Yes, Firm decision", color: "#FFBD45" },
  leaning: { label: "Leaning one party", color: "#235FE3" },
  thinking: { label: "Still thinking", color: "#20BC5B" },
  wont_vote: { label: "Won’t vote", color: "#B77EF3" },
} satisfies ChartConfig;

export function VotingChart({ analytics }: { analytics?: any }) {
  const votingData = analytics?.voting_decision || [];

  // Merge the API data with default categories
  const chartData = defaultChartData.map((item) => {
    const found = votingData.find(
      (v: any) => v.choice?.toLowerCase() === item.choice.toLowerCase()
    );
    return { ...item, count: found ? found.count : 0 };
  });

  return (
    <Card className="w-full rounded-[10px] border border-[#D2D5DA] shadow-none col-span-2">
      <CardHeader className="flex justify-between items-center space-y-0 py-2 mb-4 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Whom to vote for on 11 November?</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full pt-10"
        >
          <BarChart data={chartData}>
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              width={40}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="choice" />}
            />
            <Bar dataKey="count" radius={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartConfig[entry.choice as keyof typeof chartConfig].color
                  }
                />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                fontSize={12}
                fill="#374151"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
