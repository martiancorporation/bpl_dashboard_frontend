import { Clock, FileText, User } from "lucide-react";
import { useState } from "react";

export default function Body() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex bg-[#FBFBFB] flex-col gap-y-3 py-5 px-4 sm:px-8 h-[calc(100%-45px)]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {[
          {
            icon: FileText,
            label: "Total Enquires",
            value: 40,
          },
          {
            icon: User,
            label: "Total Admissions",
            value: 30,
          },
          {
            icon: Clock,
            label: "Last 24 hours Admissions",
            value: 200,
          },
         
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
                {loading ? "..." : value ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
