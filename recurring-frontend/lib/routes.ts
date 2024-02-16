export const API_ROUTES = {
  AUTH: process.env.BACKEND_URL_AUTH ?? "http://localhost:4001",
  PROJECT: process.env.BACKEND_URL_PROJECT ?? "http://localhost:4002",
  EMPLOYEE: process.env.BACKEND_URL_EMPLOYEE ?? "http://localhost:4003",
  CHAT: process.env.BACKEND_URL_CHAT ?? "http://localhost:4004",
};
