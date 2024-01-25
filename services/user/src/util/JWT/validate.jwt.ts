import Jwt from "jsonwebtoken";

interface JwtPayload {
  user: string;
  role: string;
}

const validateJwt = (token: string): JwtPayload => {
  let secret = process.env.ACCESS_SECRET ?? "";
  return Jwt.verify(token, secret) as JwtPayload;
};

export { validateJwt };
