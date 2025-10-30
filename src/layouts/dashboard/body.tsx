// src/components/dashboard/body.tsx
import { GenderChart } from "./gender-chart";
import { AgeGroupChart } from "./age-group-chart";
import { CommunityChart } from "./community-chart";
import { IssuesChart } from "./issues-chart";
import { PoliticalMoodChart } from "./political-mood-chart";
import CandidateWinPercentages from "./candidate-win-percentages";
import type { CommonProps } from "./types";
import { LoaderCircle } from "lucide-react";
import { ReasonChart } from "./reason-chart";
import { VotingChart } from "./voting-chart";

export const Body: React.FC<CommonProps> = ({ analytics, loading }) => {
  const totals = analytics?.totals;

  return (
    <div className="container mx-auto px-8 h-full">
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-55px)]">
          <LoaderCircle size={40} className="animate-spin text-[#2563EB]" />
        </div>
      ) : !analytics ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-lg">No analytics data available.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 py-5">
          {/* Totals Section */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: "/assets/icon/enquiry.svg",
                label: "Total Enquiries",
                value: totals?.totalEnquiries ?? 0,
                bg: "bg-[#2563EB]",
              },
              {
                icon: "/assets/icon/enquirytwo.svg",
                label: "Last 24 Hours Enquiries",
                value: totals?.last24HoursEnquiries ?? 0,
                bg: "bg-[#B163FF]",
              },
              {
                icon: "/assets/icon/enquirythree.svg",
                label: "Last 7 Days Enquiries",
                value: totals?.last7DaysEnquiries ?? 0,
                bg: "bg-[#22C55E]",
              },
            ].map(({ icon, label, value, bg }, i) => (
              <div
                key={i}
                className="w-full rounded-[12px] border border-[#EEEEEE] bg-white px-4 py-4 flex items-center gap-x-2"
              >
                <div
                  className={`${bg} size-11 rounded-[10px] flex items-center justify-center`}
                >
                  <img src={icon} alt={label} className="size-7" />
                </div>
                <div>
                  <p className="text-[#121212] text-xl font-bold">{value}</p>
                  <p className="text-[#636363] text-sm font-normal">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* === Charts Section === */}
          <div>
            <CandidateWinPercentages analytics={analytics} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <VotingChart analytics={analytics} />
            <ReasonChart analytics={analytics} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GenderChart analytics={analytics} />
            <AgeGroupChart analytics={analytics} />
            <CommunityChart analytics={analytics} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <IssuesChart analytics={analytics} />
            <PoliticalMoodChart analytics={analytics} />
          </div>
        </div>
      )}
    </div>
  );
};
