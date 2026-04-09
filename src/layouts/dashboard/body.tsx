import { FileText } from "lucide-react";
import { useState } from "react";
import { GenderChart } from "./gender-chart";
import { AgeGroupChart } from "./age-group-chart";
import { CommunityChart } from "./community-chart";
// import { IssuesChart } from "./issues-chart";
// import { PoliticalMoodChart } from "./political-mood-chart";
// import { VotingChart } from "./voting-chart";
// import { ReasonChart } from "./reason-chart";
import type { CommonProps } from "../survey/types";

const Body: React.FC<CommonProps> = (_this) => {
  return (
    <div className="flex bg-[#FBFBFB] flex-col gap-y-3 py-5 px-4 sm:px-8 h-[calc(100%-45px)]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {[
          {
            icon: FileText,
            label: "Total Enquires",
            value: _this.surveyData?.length,
          }
        ].map(({ icon: Icon, label, value }, i) => (
          <div
            key={i}
            className="w-full rounded-[6px] border border-[#EEEEEE] bg-white px-2 py-5 flex items-center gap-x-2"
          >
            <div className="bg-[#EAF9FF] w-[40px] h-[40px] rounded-full flex items-center justify-center">
              <Icon className="text-[#44A5FF] w-5" />
            </div>
            <div>
              <p className="text-[#636363] text-[13px] font-medium">{label}</p>
              <p className="text-[#464646] text-[18px] font-bold">
                {_this.loading ? "..." : (value ?? 0)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <GenderChart {..._this} />
        <AgeGroupChart {..._this} />
        <CommunityChart {..._this} />
      </div>
      {/* <div className="grid grid-cols-3 gap-4">
        <IssuesChart/>
        <PoliticalMoodChart/>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <VotingChart/>
        <ReasonChart/>
      </div> */}
    </div>
  );
};

export default Body;
