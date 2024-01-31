import axios from "axios";

interface RequestProps {
  method: string;
  url: string;
  headers: {};
  data?: {};
  route?: string;
  withCredentials?: boolean;
}

export const actualCommonRequest = async ({
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
