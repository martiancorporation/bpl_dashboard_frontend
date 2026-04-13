"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { QuestionDistribution } from "@/hooks/useSurveyAnalytics";

const SENTIMENT_LABELS: Record<string, string> = {
  "1": "Good Work Done",
  "2": "Some Work, Not Enough",
  "3": "Nothing Done",
  "4": "More Harm Than Good",
};

const BAR_COLORS: Record<string, string> = {
  "1": "#22C55E",
  "2": "#FBBF24",
  "3": "#EF4444",
  "4": "#991B1B",
};

const BG_COLORS: Record<string, string> = {
  "1": "#F0FDF4",
  "2": "#FEFCE8",
  "3": "#FEF2F2",
  "4": "#FFF1F2",
};

interface MlaReportCardChartProps {
  data?: QuestionDistribution;
}

export function MlaReportCardChart({ data }: MlaReportCardChartProps) {
  const { items, total, sentimentScore } = useMemo(() => {
    if (!data) return { items: [], total: 0, sentimentScore: null };

    const total = Object.values(data).reduce((sum, v) => sum + v, 0);

    const items = (["1", "2", "3", "4"] as const).map((key) => ({
      key,
      label: SENTIMENT_LABELS[key],
      count: data[key],
      percent: total > 0 ? Math.round((data[key] / total) * 100) : 0,
      barColor: BAR_COLORS[key],
      bgColor: BG_COLORS[key],
    }));

    // Sentiment score: weight positive (1=100, 2=66, 3=33, 4=0) and average
    const weights: Record<string, number> = { "1": 100, "2": 66, "3": 33, "4": 0 };
    const weightedSum = (["1", "2", "3", "4"] as const).reduce(
      (sum, key) => sum + data[key] * weights[key],
      0
    );
    const sentimentScore = total > 0 ? Math.round(weightedSum / total) : 0;

    return { items, total, sentimentScore };
  }, [data]);

  const getSentimentLabel = (score: number | null) => {
    if (score === null) return "—";
    if (score >= 75) return "Very Positive";
    if (score >= 50) return "Moderate";
    if (score >= 25) return "Negative";
    return "Very Negative";
  };

  const getSentimentColor = (score: number | null) => {
    if (score === null) return "#9CA3AF";
    if (score >= 75) return "#16A34A";
    if (score >= 50) return "#CA8A04";
    if (score >= 25) return "#EA580C";
    return "#DC2626";
  };

  if (!data) {
    return (
      <Card className="flex flex-col border border-[#D2D5DA] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">MLA Report Card</CardTitle>
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
        <CardTitle className="text-base">MLA Report Card</CardTitle>
        <CardDescription className="text-xs">
          How has MLA Subrata Maitra performed? · {total} responses
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Sentiment Score Gauge */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
          <div className="flex flex-col items-center justify-center min-w-[72px]">
            <span
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: getSentimentColor(sentimentScore) }}
            >
              {sentimentScore}
            </span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
              Score
            </span>
          </div>
          <div className="flex-1">
            {/* Score bar */}
            <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${sentimentScore ?? 0}%`,
                  background: `linear-gradient(90deg, ${getSentimentColor(sentimentScore)}, ${getSentimentColor(sentimentScore)}CC)`,
                }}
              />
            </div>
            <p className="mt-1 text-xs font-semibold" style={{ color: getSentimentColor(sentimentScore) }}>
              {getSentimentLabel(sentimentScore)}
            </p>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-3 p-2 rounded-md transition-colors"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-[#374151] truncate">
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold text-[#111827] tabular-nums ml-2 shrink-0">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/80 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.barColor,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
