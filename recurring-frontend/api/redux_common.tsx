import { handleError } from "@/util/functions";
import axios from "axios";

interface RequestProps {
  route?: string;
  method: string;
  url: string;
  data?: {};
  headers: {};
  withCredentials?: boolean;
  rejectWithValue?: any;
}

export const reduxCommonRequest = async ({
  route,
  method,
  url,
  data,
  headers,
  rejectWithValue,
}: RequestProps): Promise<any> => {
  const apiInstance = axios.create({
    baseURL: route,
  });

  apiInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );

  let requestConfig: RequestProps = {
    method,
    url,
    data,
    headers,
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);
    console.log("🚀 ~ response:", response);

    return response;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
};
