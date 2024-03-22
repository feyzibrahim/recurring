import { getObject } from "@/util/localStorage";
import axios from "axios";

interface RequestProps {
  method: string;
  url: string;
  headers: {};
  data?: {};
  route?: string;
  withCredentials?: boolean;
}

export const clientRequestWithRefreshToken = async ({
  route,
  method,
  url,
  data,
  headers,
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

  const user_data: { access_token: string; refresh_token: string } =
    getObject("user_data");

  if (user_data) {
    headers = {
      ...headers,
      Authorization: `Bearer ${user_data.refresh_token}`,
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
    return error;
  }
};
