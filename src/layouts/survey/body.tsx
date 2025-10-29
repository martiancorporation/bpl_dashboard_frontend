import SurveyTable from "./survey-table";
import type { CommonProps } from "./types";

const Body: React.FC<CommonProps> = (_this) => {
  return (
    <div className="container mx-auto px-8 h-full">
      <SurveyTable {..._this} />
    </div>
  );
};

export default Body;
