"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { QuestionDistribution } from "@/hooks/useSurveyAnalytics";

const CANDIDATE_LABELS: Record<string, string> = {
  "1": "Adhir Ranjan (INC)",
  "2": "Subrata Maitra (BJP)",
  "3": "Naru Gopal (TMC)",
  "4": "Close Fight",
};

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#94A3B8"];

const chartConfig = {
  "1": { label: CANDIDATE_LABELS["1"], color: COLORS[0] },
  "2": { label: CANDIDATE_LABELS["2"], color: COLORS[1] },
  "3": { label: CANDIDATE_LABELS["3"], color: COLORS[2] },
  "4": { label: CANDIDATE_LABELS["4"], color: COLORS[3] },
} satisfies ChartConfig;

interface WinningPredictionChartProps {
  data?: QuestionDistribution;
}

export function WinningPredictionChart({ data }: WinningPredictionChartProps) {
  const { chartData, total, items } = useMemo(() => {
    if (!data) return { chartData: [], total: 0, items: [] };

    const total = Object.values(data).reduce((sum, v) => sum + v, 0);
    const chartData = (["1", "2", "3", "4"] as const).map((key, i) => ({
      option: CANDIDATE_LABELS[key],
      count: data[key],
      fill: COLORS[i],
    }));

    const items = chartData.map((d, i) => ({
      label: d.option,
      color: COLORS[i],
      count: d.count,
      percent: total > 0 ? Math.round((d.count / total) * 100) : 0,
    }));

    return { chartData, total, items };
  }, [data]);

  if (!data) {
    return (
      <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Winning Prediction</CardTitle>
          <CardDescription className="text-xs">Loading…</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[280px]">
          <p className="text-sm text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Winning Prediction</CardTitle>
        <CardDescription className="text-xs">
          Who will win the Berhampore seat? · {total} responses
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#E5E7EB" />
            <YAxis
              dataKey="option"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              width={130}
              tick={{ fontSize: 11, fill: "#6B7280" }}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#4B5563] text-xs font-medium">
                  {item.label}
                </span>
              </div>
              <span className="text-black text-xs font-semibold tabular-nums">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}