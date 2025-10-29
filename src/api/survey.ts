import { apiConnector, getToken, handleResponse } from "./core";
import { surveyEndpoints } from "./apis";

const { GET_SURVEYS, GET_SURVEY_BY_ID } = surveyEndpoints;

const survey = {
  GetSurveyData: async (paramsdata: any) => {
    const token = await getToken();
    let response = null;
    try {
      response = await apiConnector(
        "GET",
        GET_SURVEYS,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        paramsdata
      );
    } catch (error) {
      response = error;
    }
    return handleResponse(response);
  },
  GetSurveyDetails: async (param: any) => {
    const token = await getToken();
    let response = null;
    try {
      response = await apiConnector(
        "GET",
        `${GET_SURVEY_BY_ID}/${param.survey_id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      response = error;
    }
    return handleResponse(response);
  },
};

export default survey;
