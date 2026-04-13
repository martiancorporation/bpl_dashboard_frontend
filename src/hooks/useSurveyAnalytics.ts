import API from "@/api";
import { useCallback, useEffect, useState } from "react";

export interface QuestionDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
}

export interface SurveyAnalytics {
  total: number;
  distribution: {
    question_1: QuestionDistribution;
    question_2: QuestionDistribution;
    question_3: QuestionDistribution;
    question_4: QuestionDistribution;
    question_5: QuestionDistribution;
  };
}

const useSurveyAnalytics = () => {
  const [analytics, setAnalytics] = useState<SurveyAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    API.survey
      .GetSurveyAnalytics()
      .then((response: any) => {
        if (response?.data) {
          setAnalytics(response.data);
        }
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics,
  };
};

export default useSurveyAnalytics;