"use client";
import { Bar, BarChart, XAxis, LabelList, Cell, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// ✅ Define all fixed issues (order preserved)
const ISSUE_KEYS = [
  "roads",
  "electricity",
  "health",
  "jobs",
  "education",
  "law_order",
  "others",
] as const;

// type IssueKey = (typeof ISSUE_KEYS)[number];

// ✅ Color and label config
const chartConfig = {
  roads: { label: "Roads", color: "#C084FC" },
  electricity: { label: "Electricity", color: "#2563EB" },
  health: { label: "Health", color: "#FB923C" },
  jobs: { label: "Jobs", color: "#22C55E" },
  education: { label: "Education", color: "#CD0AD0" },
  law_order: { label: "Law & Order", color: "#FFF04A" },
  others: { label: "Others", color: "#3ADDE3" },
} satisfies ChartConfig;

// ✅ Default color fallback
const DEFAULT_COLOR = "#9CA3AF";

interface IssuesChartProps {
  analytics?: {
    issues?: {
      issue: string;
      count: number;
    }[];
  } | null;
}

export function IssuesChart({ analytics }: IssuesChartProps) {
  // normalize backend data
  const backendIssues = analytics?.issues ?? [];

  // ✅ merge with default structure to ensure all keys exist
  const chartData = ISSUE_KEYS.map((key) => {
    const backendItem = backendIssues.find(
      (i) => i.issue.toLowerCase() === key.toLowerCase()
    );
    return {
      issues: chartConfig[key].label,
      key,
      count: backendItem?.count ?? 0, // default 0 if not present
      color: chartConfig[key].color,
    };
  });

  // const total = chartData.reduce((sum, d) => sum + d.count, 0);

  // ✅ items for legend / percentage
  // const items = chartData.map((item) => ({
  //   label: item.issues,
  //   color: item.color,
  //   percent: total > 0 ? `${Math.round((item.count / total) * 100)}%` : "0%",
  //   value: item.count,
  // }));

  return (
    <Card className="w-full rounded-[10px] border border-[#D2D5DA] shadow-none col-span-2">
      <CardHeader className="flex justify-between items-center space-y-0 sm:flex-row px-4 py-2 sm:py-2">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Trending Issues to Solve</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] pt-5 w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="issues"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              width={40}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="issues" />}
            />
            <Bar dataKey="count" radius={6}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color ?? DEFAULT_COLOR}
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

        {/* ✅ Summary Section */}
        {/* <div className="flex flex-col gap-3 mt-4">
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
              <div className="flex items-center gap-4">
                <span className="text-black text-sm font-medium">
                  {item.percent}
                </span>
                <span className="text-[#6B7280] text-sm">{item.value}</span>
              </div>
            </div>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
}
