import axios from "axios";
import { cookies } from "next/headers";

interface RequestProps {
  method: string;
  url: string;
  data?: {};
  headers: {};
  withCredentials?: boolean;
  rejectWithValue?: any;
  Cookie?: any;
  route?: string;
}

export const actualServerCommonRequest = async ({
  method,
  url,
  data,
  headers,
  route,
}: RequestProps): Promise<any> => {
  
  const apiInstance = axios.create({
    baseURL: route,
  });

  apiInstance.interceptors.response.use((response) => {
    return response.data;
  });

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
    return error.response
      ? error.response.data
        ? error.response.data
        : error.response
      : error;
  }
};
