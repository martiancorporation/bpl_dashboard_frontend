"use client";

import { useMemo } from "react";
import { Pie, PieChart, Cell, LabelList } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { QuestionDistribution } from "@/hooks/useSurveyAnalytics";

const CANDIDATE_LABELS: Record<string, string> = {
  "1": "Adhir Ranjan (INC)",
  "2": "Naru Gopal (TMC)",
  "3": "Subrata Maitra (BJP)",
  "4": "Someone Else",
};

const COLORS = ["#3B82F6", "#22C55E", "#F97316", "#A78BFA"];

const chartConfig = {
  count: { label: "Responses" },
  "1": { label: CANDIDATE_LABELS["1"], color: COLORS[0] },
  "2": { label: CANDIDATE_LABELS["2"], color: COLORS[1] },
  "3": { label: CANDIDATE_LABELS["3"], color: COLORS[2] },
  "4": { label: CANDIDATE_LABELS["4"], color: COLORS[3] },
} satisfies ChartConfig;

interface BestCandidateChartProps {
  data?: QuestionDistribution;
}

export function BestCandidateChart({ data }: BestCandidateChartProps) {
  const { chartData, total, items } = useMemo(() => {
    if (!data) return { chartData: [], total: 0, items: [] };

    const total = Object.values(data).reduce((sum, v) => sum + v, 0);
    const chartData = (["1", "2", "3", "4"] as const).map((key, i) => ({
      candidate: CANDIDATE_LABELS[key],
      count: data[key],
      fill: COLORS[i],
    }));

    const items = chartData.map((d, i) => ({
      label: d.candidate,
      color: COLORS[i],
      count: d.count,
      percent: total > 0 ? Math.round((d.count / total) * 100) : 0,
    }));

    // Find leading candidate
    let maxCount = 0;
    let leaderName = "";
    chartData.forEach((d) => {
      if (d.count > maxCount) {
        maxCount = d.count;
        leaderName = d.candidate;
      }
    });

    return {
      chartData,
      total,
      items,
      leader: leaderName
        ? { name: leaderName, percent: total > 0 ? Math.round((maxCount / total) * 100) : 0 }
        : null,
    };
  }, [data]);

  if (!data) {
    return (
      <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Best Candidate</CardTitle>
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
        <CardTitle className="text-base">Best Candidate</CardTitle>
        <CardDescription className="text-xs">
          Who is the best candidate for Berhampore? · {total} responses
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square h-[220px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="candidate" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="candidate"
              innerRadius={50}
              outerRadius={85}
              stroke="none"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="count"
                fontSize={11}
                fontWeight={600}
                fill="#fff"
                formatter={(value: number) => (value > 0 ? value.toString() : "")}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* {leader && (
          <div className="text-center py-2 px-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-600 font-medium">Leading</p>
            <p className="text-sm text-blue-900 font-bold">{leader.name}</p>
            <p className="text-lg font-extrabold text-blue-700">{leader.percent}%</p>
          </div>
        )} */}

        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#4B5563] text-xs font-medium">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#9CA3AF] text-xs tabular-nums">
                  {item.count}
                </span>
                <span className="text-black text-xs font-semibold tabular-nums min-w-[32px] text-right">
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
