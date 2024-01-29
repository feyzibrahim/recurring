import Jwt from "jsonwebtoken";
import { User } from "../../Entities/User";
const createJwtAccessToken = (user: User): string => {
  const secret = process.env.ACCESS_SECRET || "";

  return Jwt.sign(
    { user: user._id, roles: user.role, organization: user.organization },
    secret,
    {
      expiresIn: "1h",
    }
  );
};

const createJwtRefreshToken = (user: User): string => {
  const secret = process.env.REFRESH_SECRET || "";

  return Jwt.sign({ user: user._id, roles: user.role }, secret, {
    expiresIn: "30d",
  });
};

export { createJwtAccessToken, createJwtRefreshToken };
