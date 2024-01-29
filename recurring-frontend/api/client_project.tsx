import axios from "axios";

export const BACKEND_URL = "http://localhost:4002/api";

const apiInstance = axios.create({
  baseURL: BACKEND_URL,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

interface RequestProps {
  method: string;
  url: string;
  data?: {};
  headers: {};
  withCredentials?: boolean;
}

export const commonRequestProject = async ({
  method,
  url,
  data,
  headers,
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
    return error;
  }
};
