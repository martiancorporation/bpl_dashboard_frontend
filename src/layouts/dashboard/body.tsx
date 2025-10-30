
import { useState } from "react";
import CandidateWinPercentages from "./candidate-win-percentages";
import VotingChart from "./voting-chart";

export default function Body() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex bg-[#FBFBFB] flex-col gap-y-3 py-5 px-4 sm:px-8 h-[calc(100%-45px)]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {[
          {
            icon: "/assets/icon/enquiry.svg",
            label: "Total Enquiries",
            value: 50,
            bg: "bg-[#2563EB]",
          },
          {
            icon: "/assets/icon/enquirytwo.svg",
            label: "Last 24 hours Enquiries",
            value: 14,
            bg: "bg-[#B163FF]",
          },
          {
            icon: "/assets/icon/enquirythree.svg",
            label: "Last 7 Day Enquiries",
            value: 14,
            bg: "bg-[#22C55E]",
          },
        ].map(({ icon: Icon, label, value, bg }, i) => (
          <div
            key={i}
            className="w-full rounded-[12px] border border-[#EEEEEE] bg-white px-4 py-4 flex items-center gap-x-2"
          >
            <div
              className={`${bg} size-11 rounded-[10px] flex items-center justify-center`}
            >
              <img src={Icon} alt={Icon} className="size-7" />
            </div>
            <div>
              <p className="text-[#121212] text-xl font-bold">
                {loading ? "..." : value ?? 0}
              </p>
              <p className="text-[#636363] text-sm font-normal">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <CandidateWinPercentages />
      </div>
      <div>
        <VotingChart/>
      </div>
    </div>
  );
}
