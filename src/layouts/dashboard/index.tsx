import Navbar from "@/components/dashboard-layouts/navbar";

const Dashboard = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <Navbar title={"Dashboard"} />

      <div className="flex bg-[#FBFBFB] flex-col gap-y-3 h-[calc(100%-50px)] overflow-y-scroll overscroll-y-contain eme-scroll">
        {/* <AdmissionTable
          data={allAdmissionData}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        /> */}
      </div>
    </main>
  );
};

export default Dashboard;
