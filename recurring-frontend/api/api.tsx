import { handleError } from "@/util/functions";
import axios from "axios";

export const BACKEND_URL = "http://localhost:4001/api";

const apiInstance = axios.create({
  baseURL: BACKEND_URL,
});

apiInstance.interceptors.response.use((response) => {
  return response.data;
});

interface RequestProps {
  method: string;
  url: string;
  data?: {};
  headers: {};
  withCredentials?: boolean;
  rejectWithValue?: any;
}

export const commonReduxRequest = async ({
  method,
  url,
  data,
  headers,
  rejectWithValue,
}: RequestProps): Promise<any> => {
  let requestConfig: RequestProps = {
    method,
    url,
    data,
    headers,
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);

    return response;
  } catch (error) {
    console.log("api.tsx: error", error);
    return handleError(error, rejectWithValue);
  }
};
