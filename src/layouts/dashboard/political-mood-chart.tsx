"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodItem {
  mood: string;
  count: number;
}

interface PoliticalMoodChartProps {
  analytics?: {
    mood?: MoodItem[];
  };
  loading?: boolean;
}

// Define all possible moods with their labels and colors
const defaultMoods = [
  { mood: "angry", label: "Angry", color: "#C084FC" },
  { mood: "silent", label: "Silent", color: "#2563EB" },
  { mood: "want_change", label: "Want change", color: "#F97316" },
  { mood: "loyal_to_old_party", label: "Loyal to old party", color: "#22C55E" },
];

export function PoliticalMoodChart({
  analytics,
  loading,
}: PoliticalMoodChartProps) {
  const moodData = analytics?.mood || [];

  // Convert to map for easy lookup
  const moodMap = Object.fromEntries(
    moodData.map((item) => [item.mood, item.count])
  );

  // Merge with defaults to ensure all moods are present
  const chartData = defaultMoods.map((item) => ({
    label: item.label,
    color: item.color,
    value: moodMap[item.mood] || 0,
  }));

  return (
    <Card className="w-full rounded-[10px] border border-[#D2D5DA] shadow-none">
      <CardHeader className="px-4 py-3">
        <CardTitle>Political Mood</CardTitle>
      </CardHeader>

      <CardContent className=" h-[300px]  flex flex-col justify-between px-6 pb-6">
        {loading ? (
          <div className="flex flex-col gap-3">
            {defaultMoods.map((m) => (
              <div key={m.mood} className="animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-8 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          chartData.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#3E3636] font-medium">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500">{item.value}</span>
              </div>
              <div className="relative h-7 w-full rounded-[6px] bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-[6px] transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.min(item.value, 100)}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
