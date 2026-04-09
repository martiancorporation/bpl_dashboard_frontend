import Navbar from "@/components/dashboard-layouts/navbar";
import Body from "./body";
import useSurvey from "@/hooks/useSurvey";

const Dashboard = () => {
  const _this = useSurvey();
  return (
    <main className="w-full h-full flex flex-col">
      <Navbar title={"Survey Details"} />
      <Body {..._this} />
    </main>
  );
};

export default Dashboard;
