import { handleError } from "@/util/functions";
import { getObject } from "@/util/localStorage";
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

  apiInstance.interceptors.response.use((response) => {
    return response.data;
  });

  const user_data: { access_token: string; refresh_token: string } =
    getObject("user_data");

  if (user_data) {
    headers = {
      ...headers,
      Authorization: `Bearer ${user_data.access_token}`,
    };
  }

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
    console.log("file: redux_common.tsx:48 -> error", error);
    return handleError(error, rejectWithValue);
  }
};
