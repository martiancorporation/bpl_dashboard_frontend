import { apiConnector, getToken, handleResponse } from "./core";
import { authEndpoints } from "./apis";

const { LOGIN_API, UPDATE_PASSWORD_API } = authEndpoints;

const auth = {
  SignIn: async (data: any) => {
    let response = null;
    try {
      response = await apiConnector("POST", LOGIN_API, data);
    } catch (error) {
      response = error;
    }
    return handleResponse(response);
  },
  UpdatePassword: async (data: any) => {
    const token = await getToken();
    let response = null;
    try {
      response = await apiConnector("PUT", UPDATE_PASSWORD_API, data, {
        Authorization: `Bearer ${token}`,
      });
    } catch (error) {
      response = error;
    }
    return handleResponse(response);
  },
};

export default auth;
