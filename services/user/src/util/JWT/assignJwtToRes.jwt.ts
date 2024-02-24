import { Response } from "express";
import { createJwtAccessToken, createJwtRefreshToken } from "./create.jwt";
import { User } from "../../Entities/User";
import cookieConfig from "../../constants/cookieConfig";

const assignJwtToRes = (res: Response, user: User) => {
  // Setting JWT Tokens
  const access_token = createJwtAccessToken(user as User);
  const refresh_token = createJwtRefreshToken(user as User);
  res.cookie("access_token", access_token, cookieConfig);
  res.cookie("refresh_token", refresh_token, cookieConfig);
};

export { assignJwtToRes };
