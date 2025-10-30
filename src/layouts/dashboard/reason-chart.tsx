"use client";

import { LabelList, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// master categories list
const defaultChartData = [
  { reason: "leadersImage", label: "Leader's Image", fill: "#235FE3" },
  { reason: "casteOrCommunity", label: "Caste/Community", fill: "#B77EF3" },
  { reason: "developmentWork", label: "Development Work", fill: "#20BC5B" },
  { reason: "partyIdeology", label: "Party Ideology", fill: "#EF8C3A" },
  { reason: "religion", label: "Religion", fill: "#C30AC9" },
  { reason: "other", label: "Others", fill: "#FFBD45" },
];

const chartConfig = {
  leadersImage: { label: "Leader's Image", color: "#235FE3" },
  casteOrCommunity: { label: "Caste/Community", color: "#B77EF3" },
  developmentWork: { label: "Development Work", color: "#20BC5B" },
  partyIdeology: { label: "Party Ideology", color: "#EF8C3A" },
  religion: { label: "Religion", color: "#C30AC9" },
  other: { label: "Others", color: "#FFBD45" },
} satisfies ChartConfig;

// mapping backend keys to frontend keys
const normalizeReasonKey = (key: string): string => {
  switch (key?.toLowerCase()) {
    case "leader_image":
      return "leadersImage";
    case "caste":
      return "casteOrCommunity";
    case "development_work":
      return "developmentWork";
    case "party_ideology":
      return "partyIdeology";
    case "religion":
      return "religion";
    case "other":
      return "other";
    default:
      return key;
  }
};

export function ReasonChart({ analytics }: { analytics?: any }) {
  const backendData = analytics?.voting_reason || [];

  // normalize backend data keys
  const normalizedData = backendData.map((r: any) => ({
    reason: normalizeReasonKey(r.reason),
    count: r.count,
  }));

  // merge with defaults (guarantee all reasons exist)
  const chartData = defaultChartData.map((item) => {
    const found = normalizedData.find(
      (r: any) => r.reason?.toLowerCase() === item.reason.toLowerCase()
    );
    return { ...item, count: found ? found.count : 0 };
  });

  const total = chartData.reduce((sum, d) => sum + d.count, 0);
  const items = chartData.map((d) => ({
    label: d.label,
    color: d.fill,
    percent: total ? ((d.count / total) * 100).toFixed(0) + "%" : "0%",
  }));

  return (
    <Card className="flex flex-col border border-[#D2D5DA] shadow-none col-span-3">
      <CardHeader className="flex justify-between items-center space-y-0 py-2 mb-4 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>What is the reason for voting?</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background w-full sm:w-1/2 aspect-square h-[280px] mt-2"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="reason" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
            >
              <LabelList
                dataKey="count"
                position="outside"
                fontSize={11}
                fill="#374151"
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col gap-y-2 w-full sm:w-1/2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border rounded-md p-2"
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
}
