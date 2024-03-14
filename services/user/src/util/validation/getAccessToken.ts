import { Request } from "express";

const getAccessToken = (req: Request) => {
  let token: string | null = null;
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  if (!token) {
    throw new Error("Authorization token not found");
  }
  return token;
};

export default getAccessToken;
