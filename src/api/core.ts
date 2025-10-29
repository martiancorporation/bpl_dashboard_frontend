import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { authEndpoints } from "./apis";
import useSessionStore from "@/store/session";
const { REFRESH_TOKEN } = authEndpoints;

export const axiosInstance = axios.create({});
export const apiConnector = async <T = any>(
  method: Method,
  url: string,
  bodyData?: any,
  headers?: Record<string, string>,
  params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? {},
    params: params ?? {},
  };

  return axiosInstance(config);
};

export const handleResponse = (response: any) => {
  const { setUnauthorizedAccess } = useSessionStore.getState();
  if (response?.status === 202) toast.warning(response.data.error);
  else if (response?.response?.status === 500) toast.error(response?.message);
  else if (response?.response?.status === 401) {
    setUnauthorizedAccess(true);
    toast.error("Unauthorized api call");
  } else if (response?.status === 200) return response?.data;
  else toast.error("Something went wrong.");
  return false;
};

export const getToken = async () => {
  const { setUnauthorizedAccess } = useSessionStore.getState();
  const storedSession = localStorage.getItem("userSession");
  const session = storedSession ? JSON.parse(storedSession) : null;

  let response = session?.access_token;
  const token_expired =
    moment(session?.token_expiry).diff(moment(), "seconds") < 5 ? true : false;

  if (session && token_expired) {
    //call refresh token and update client token
    // console.log("token refresh");
    try {
      const apiresponse = await apiConnector(
        "GET",
        REFRESH_TOKEN +
          session.email +
          "/" +
          session.active_session_refresh_token +
          "/" +
          session.device
      );
      if (apiresponse?.status === 200) {
        // console.log("session data", session);
        session.access_token = apiresponse.data.access_token;
        session.token_expiry = apiresponse.data.token_expiry;
        session.active_session_refresh_token =
          apiresponse.data.active_session_refresh_token;
        response = session.access_token;
        localStorage.setItem("userSession", JSON.stringify(session));
      } else {
        throw apiresponse.data.error;
      }
    } catch (e) {
      setUnauthorizedAccess(true);
      toast.error("Unauthorized api call");
    }
  }

  return response + "||" + session?.device;
};
