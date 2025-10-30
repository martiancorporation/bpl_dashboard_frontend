
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CandidateWinPercentages() {


  // Static candidate list (name + image)
  const candidates = [
    {
      id: "adilHasan",
      name: "Adil Hasan",
      imageUrl: "/assets/mla/Adil_Hasan.png",
    },
    {
      id: "mehboobAlam",
      name: "Mehboob Alam",
      imageUrl: "/assets/mla/Mehboob_Alam.png",
    },
    {
      id: "sangeetaDevi",
      name: "Sangeeta Devi",
      imageUrl: "/assets/mla/Sangeeta_Devi.png",
    },
    {
      id: "mdZinnah",
      name: "MD Zinnah",
      imageUrl: "/assets/mla/MdZinnah.png",
    },
    {
      id: "erMoazzam",
      name: "Er Moazzam Hussain",
      imageUrl: "/assets/mla/Moazzam_Hussain.png",
    },
    {
      id: "other",
      name: "Other",
      imageUrl: "/assets/mla/other.svg",
    },
  ];

 

  return (
    <Card className="w-full bg-[#ffffff] border border-[#DDDDDD] rounded-[12px] shadow-none p-4">
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
        {candidates.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center justify-center gap-2"
              >
                <Avatar className="w-16 h-16 border-none shadow-none">
                  <AvatarImage src={c.imageUrl} alt={c.name} />
                  <AvatarFallback>{c.name[0]}</AvatarFallback>
                </Avatar>
                <p className="mt-1 text-sm font-semibold text-[#000000]">
                  {c.name}
                </p>
                <p className="text-lg font-semibold text-[#000000]">50%</p>
              </div>
            ))}
      </CardContent>
    </Card>
  );
}
