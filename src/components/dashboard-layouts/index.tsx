import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar should be fixed-height, full-screen */}
      <Sidebar />

      {/* Main content scrolls independently */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <Outlet /> {/* Child routes render here */}
        </main>
      </div>
    </div>
  );
}
