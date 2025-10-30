// src/pages/dashboard/index.tsx
import Navbar from "@/components/dashboard-layouts/navbar";
import { useEffect, useState } from "react";
import API from "@/api";
import { Body } from "./body";
import type { AnalyticsData } from "./types";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await API.survey.GetSurveyAnalytics();
      if (response?.data) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <main className="w-full flex-1 flex flex-col overflow-y-auto">
      <Navbar title="Dashboard" />
      <Body analytics={analytics} loading={loading} />
    </main>
  );
};

export default Dashboard;
