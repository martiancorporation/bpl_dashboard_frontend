import Navbar from "@/components/dashboard-layouts/navbar";
import useSurvey from "@/hooks/useSurvey";
import Body from "./body";

const Survey = () => {
  const _this = useSurvey();

  return (
    <main className="w-full h-full flex flex-col">
      <Navbar title={"Survey Data"} />

      <Body {..._this} />
    </main>
  );
};

export default Survey;
