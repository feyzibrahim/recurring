import axios from "axios";

export const BACKEND_URL = "http://localhost:4001/";

const apiInstance = axios.create({
  baseURL: BACKEND_URL,
});

interface RequestProps {
  method: string;
  url: string;
  data?: {};
  headers: {};
  withCredentials?: boolean;
}

export const commonRequest = async ({
  method,
  url,
  data,
  headers,
  withCredentials = true,
}: RequestProps): Promise<any> => {
  let requestConfig: RequestProps = {
    method,
    url,
    data,
    headers,
    withCredentials,
  };

  try {
    const response = await apiInstance(requestConfig);
    console.log("Log: response", response);

    return response;
  } catch (error) {
    console.log("api.tsx: error", error);
    return error;
  }
};
