// DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-full scroll-smooth">
      <Sidebar />
      <main className="flex-1 overflow-auto ">
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
}
