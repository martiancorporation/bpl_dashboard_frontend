import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AnalyticsData } from "./types";

interface CandidateWinPercentagesProps {
  analytics: AnalyticsData;
}

export default function CandidateWinPercentages({
  analytics,
}: CandidateWinPercentagesProps) {
  const candidates = [
    {
      id: "adil_hasan",
      name: "Adil Hasan",
      imageUrl: "/assets/mla/Adil_Hasan.png",
    },
    {
      id: "mehboob_alam",
      name: "Mehboob Alam",
      imageUrl: "/assets/mla/Mehboob_Alam.png",
    },
    {
      id: "sangeeta_devi",
      name: "Sangeeta Devi",
      imageUrl: "/assets/mla/Sangeeta_Devi.png",
    },
    {
      id: "md_zinnah",
      name: "MD Zinnah",
      imageUrl: "/assets/mla/MdZinnah.png",
    },
    {
      id: "er_moazzam",
      name: "Er Moazzam Hussain",
      imageUrl: "/assets/mla/Moazzam_Hussain.png",
    },
    {
      id: "not_decided",
      name: "Other",
      imageUrl: "/assets/mla/other.svg",
    },
  ];

  const totalLeads = analytics.leaders.reduce((sum, l) => sum + l.count, 0);

  const getPercentage = (leaderId: string) => {
    const found = analytics.leaders.find((l) => l.leader === leaderId);
    if (!found || totalLeads === 0) return 0;
    return Math.round((found.count / totalLeads) * 100);
  };

  // 🧠 Sort candidates by their percentage (descending order)
  const sortedCandidates = [...candidates].sort(
    (a, b) => getPercentage(b.id) - getPercentage(a.id)
  );

  return (
    <Card className="w-full bg-[#ffffff] border border-[#DDDDDD] rounded-[12px] shadow-none p-4">
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
        {sortedCandidates.map((c) => (
          <div
            key={c.id}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Avatar className="w-15 h-15 border-none shadow-none">
              <AvatarImage src={c.imageUrl} alt={c.name} />
              <AvatarFallback>{c.name[0]}</AvatarFallback>
            </Avatar>
            <p className="mt-1 text-sm font-semibold text-[#000000]">
              {c.name}
            </p>
            <p className="text-lg font-semibold text-[#000000]">
              {getPercentage(c.id)}%
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
