import axios from "axios";
import { cookies } from "next/headers";

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
  Cookie?: any;
}

export const commonRequest = async ({
  method,
  url,
  data,
  headers,
}: RequestProps): Promise<any> => {
  const cookieData = cookies().get("access_token");
  let requestConfig: RequestProps = {
    method,
    url,
    data,
    headers: {
      ...headers,
      Cookie: `access_token=${cookieData?.value}`,
    },
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);

    return response;
  } catch (error: any) {
    return error.response.data;
  }
};
