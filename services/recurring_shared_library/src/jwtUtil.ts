import Jwt from "jsonwebtoken";

export type JWTPayload = {
  user: string;
  role: string;
  organization: string;
};

const createJwtAccessToken = (user: JWTPayload, secret: string): string => {
  return Jwt.sign(
    { user: user, roles: user.role, organization: user.organization },
    secret,
    {
      expiresIn: "1h",
    }
  );
};

const createJwtRefreshToken = (user: JWTPayload, secret: string): string => {
  return Jwt.sign({ user: user, roles: user.role }, secret, {
    expiresIn: "30d",
  });
};

const validateJwt = (token: string, secret: string): JWTPayload => {
  return Jwt.verify(token, secret) as JWTPayload;
};

export { createJwtAccessToken, createJwtRefreshToken, validateJwt };
