import API from "@/api";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_LIMIT = 1000;

const useSurvey = () => {
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [filterParams, setFilterParams] = useState({
    page: 1,
  });

  const { ref: lastElementRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const { page } = filterParams;

  const getSurveyData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setInitialLoading(page === 1);
    setError(null);

    API.survey
      .GetSurveyData({
        page,
        limit: PAGE_LIMIT,
      })
      .then((response: any) => {
        if (response?.data) {
          setSurveyData((prev) =>
            page === 1 ? response.data : [...prev, ...response.data],
          );
          setHasMore(response?.meta?.hasMore);
          setTotal(response?.meta?.total || 0);
        }
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  }, [page, hasMore, loading, initialLoading]);

  // Fetch data when filterParams change
  useEffect(() => {
    getSurveyData();
  }, [filterParams]);

  // Infinite scroll: load next page when sentinel is in view
  useEffect(() => {
    if (inView && hasMore && !loading && !initialLoading) {
      setFilterParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [inView, hasMore, loading, initialLoading]);

  return {
    lastElementRef,
    loading,
    initialLoading,
    page,
    hasMore,
    total,
    error,
    surveyData,
    filterParams,
    setFilterParams,
  };
};

export default useSurvey;
