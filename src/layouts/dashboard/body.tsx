import { FileText, BarChart3, Users } from "lucide-react";
import { GenderChart } from "./gender-chart";
import { AgeGroupChart } from "./age-group-chart";
import { CommunityChart } from "./community-chart";
// import { IssuesChart } from "./issues-chart";
// import { PoliticalMoodChart } from "./political-mood-chart";
// import { VotingChart } from "./voting-chart";
// import { ReasonChart } from "./reason-chart";
import type { CommonProps } from "../survey/types";
import { WinningPredictionChart } from "./winning-prediction-chart";
import { BestCandidateChart } from "./best-candidate-chart";
import { MlaReportCardChart } from "./mla-report-card-chart";
import useSurveyAnalytics from "@/hooks/useSurveyAnalytics";

const Body: React.FC<CommonProps> = (_this) => {
  const dashboardData = useSurveyAnalytics();
  const dist = dashboardData?.analytics?.distribution;
  const voteCount = dashboardData?.analytics?.distribution?.question_5;
  const votes = [
    {
      icon: <img src="/assets/images/adhir-ranjan-chowdhury.jpeg" className="w-20 h-20 rounded-full"/>,
      label: "Adhir Ranjan Chowdhury",
      value: voteCount?.["1"],
    },
    {
      icon: <img src="/assets/images/subrata-maitra.jpg" className="w-20 h-20 rounded-full"/>,
      label: "Subrata Maitra",
      value: voteCount?.["2"],
    },
    {
      icon: <img src="/assets/images/naru-gopal-mukherjee.jpg" className="w-20 h-20 rounded-full"/>,
      label: "Naru Gopal Mukherjee",
      value: voteCount?.["3"],
    },
  ]
  const statistics = [
    {
      icon: <FileText className="text-[#44A5FF] w-5"/>,
      label: "Total Enquires",
      value: _this.surveyData?.length,
    },
    {
      icon: <BarChart3 className="text-[#44A5FF] w-5"/>,
      label: "Survey Responses",
      value: dashboardData?.analytics?.total,
    },
    {
      icon: <Users className="text-[#44A5FF] w-5"/>,
      label: "Questions Covered",
      value: dist ? Object.keys(dist).length : 0,
    },
  ];
  return (
    <div className="flex bg-[#FBFBFB] flex-col gap-y-3 py-5 px-4 sm:px-8 h-[calc(100%-45px)] overflow-y-auto">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {votes.map(({ icon, label, value }, i) => (
          <div
            key={i}
            className="w-full rounded-[6px] border border-[#EEEEEE] bg-white px-2 py-5 flex items-center gap-x-3"
          >
            <div className={`bg-[#EAF9FF] w-[80px] h-[80px] rounded-full flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <p className="text-neutral-800 text-[16px] font-medium">{label}</p>
              <p className="text-neutral-950 text-[20px] font-bold">
                {_this.loading || dashboardData.loading ? "..." : (value ?? 0)}
              </p>
            </div>
          </div>
        ))}
        {statistics.map(({ icon, label, value }, i) => (
          <div
            key={i}
            className="w-full rounded-[6px] border border-[#EEEEEE] bg-white px-2 py-5 flex items-center gap-x-2"
          >
            <div className={`bg-[#EAF9FF] w-[40px] h-[40px] rounded-full flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <p className="text-[#636363] text-[13px] font-medium">{label}</p>
              <p className="text-[#464646] text-[18px] font-bold">
                {_this.loading || dashboardData.loading ? "..." : (value ?? 0)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MlaReportCardChart data={dist?.question_1} />
        <BestCandidateChart data={dist?.question_4} />
        <WinningPredictionChart data={dist?.question_5} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
