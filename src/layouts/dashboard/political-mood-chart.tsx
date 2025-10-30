"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { mood: "Angry", value: 65, color: "#C084FC" },
  { mood: "Silent", value: 80, color: "#2563EB" },
  { mood: "Want change", value: 95, color: "#F97316" },
  { mood: "Loyal to old party", value: 78, color: "#22C55E" },
];

export function PoliticalMoodChart() {
  return (
    <Card className="w-full rounded-[10px] border border-[#D2D5DA] shadow-none">
      <CardHeader className="px-4 py-3">
        <CardTitle>Political Mood</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between h-full px-6 pb-6">
        {chartData.map((item) => (
          <div key={item.mood} className="flex flex-col gap-2">
            <span className="text-sm text-[#3E3636] font-medium">{item.mood}</span>
            <div className="relative h-8 w-full rounded-[6px] bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-[6px] transition-all duration-500"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
