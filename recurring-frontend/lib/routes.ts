export const API_ROUTES = {
  AUTH: process.env.NEXT_PUBLIC_BACKEND_URL_AUTH,
  PROJECT: process.env.NEXT_PUBLIC_BACKEND_URL_PROJECT,
  EMPLOYEE: process.env.NEXT_PUBLIC_BACKEND_URL_EMPLOYEE,
  CHAT: process.env.NEXT_PUBLIC_BACKEND_URL_CHAT,
  CLIENT_DEALS: process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT_AND_DEALS,
  SUBSCRIPTION: process.env.NEXT_PUBLIC_BACKEND_URL_SUBSCRIPTION,

  // Docker server side API's are different than normal
  AUTH_SERVER: process.env.BACKEND_URL_AUTH,
  PROJECT_SERVER: process.env.BACKEND_URL_PROJECT,
  EMPLOYEE_SERVER: process.env.BACKEND_URL_EMPLOYEE,
  CHAT_SERVER: process.env.BACKEND_URL_CHAT,
  CLIENT_DEALS_SERVER: process.env.BACKEND_URL_CLIENT_AND_DEALS,
  SUBSCRIPTION_SERVER: process.env.BACKEND_URL_SUBSCRIPTION,
};
