import Navbar from "@/components/dashboard-layouts/navbar";
import Body from "./body";

const Dashboard = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <Navbar title={"Survey Details"} />
      <Body />
    </main>
  );
};

export default Dashboard;
