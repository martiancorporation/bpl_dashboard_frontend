import API from "@/api";
import Navbar from "@/components/dashboard-layouts/navbar";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Body from "./body";

const PAGE_LIMIT = 15;

const Survey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({
    page: 1,
  });

  const { ref: lastElementRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const { page } = filterParams;

  // Separated function to fetch properties
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
      .then((response) => {
        if (response?.data) {
          setSurveyData((prev) =>
            page === 1 ? response.data : [...prev, ...response.data]
          );
          setHasMore(response?.meta?.hasMore);
          setTotal(response?.meta?.total || 0);
        }
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  }, [page, hasMore, loading, initialLoading]);

  useEffect(() => {
    getSurveyData();
  }, [filterParams]);

  useEffect(() => {
    if (inView && hasMore && !loading && !initialLoading) {
      setFilterParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [inView, hasMore, loading, initialLoading]);

  const _this = {
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

  return (
    <main className="w-full h-full flex flex-col">
      <Navbar title={"Survey Data"} />

      <Body {..._this} />
    </main>
  );
};

export default Survey;
