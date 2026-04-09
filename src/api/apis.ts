const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
  LOGIN_API: BASE_URL + "/v1/auth/login",
  UPDATE_PASSWORD_API: BASE_URL + "/v1/auth/update-password",
  REFRESH_TOKEN: BASE_URL + "/v1/auth/refresh-token/",
};

// SURVEY ENDPOINTS
export const surveyEndpoints = {
  GET_ANALYTICS: BASE_URL + "/v1/survey/survey-analytics",
  GET_SURVEYS: BASE_URL + "/v1/survey/get-all-survey",
  GET_SURVEY_BY_ID: BASE_URL + "/v1/survey/get-survey",
};
