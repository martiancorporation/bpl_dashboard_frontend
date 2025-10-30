import Navbar from "@/components/dashboard-layouts/navbar";
import Body from "./body";
import { useEffect, useState } from "react";
import API from "@/api";
import { useParams } from "react-router-dom";

const SurveyDetails = () => {
  const { survey_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState<any>(null);

  const getData = async () => {
    setLoading(true);
    API.survey
      .GetSurveyDetails({ survey_id })
      .then((response) => {
        if (response) {
          setSurvey(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const _this = {
    loading,
    survey,
  };

  return (
    <main className="w-full flex-1 flex flex-col overflow-y-auto">
      <Navbar title={"Survey Details"} />
      <Body {..._this} />
    </main>
  );
};

export default SurveyDetails;
