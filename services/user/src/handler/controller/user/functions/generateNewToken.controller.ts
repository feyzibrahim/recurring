import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { User } from "../../../../Entities/User";
import {
  JWTPayload,
  createJwtAccessToken,
  createJwtRefreshToken,
  validateJwt,
} from "@recurring/shared_library";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const generateNewToken = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface
) => {
  try {
    let token = getAccessToken(req);

    const data = validateJwt(token, process.env.REFRESH_SECRET as string);

    const user = await iUserUseCase.getUser(data.user);

    if (typeof user !== "boolean" && !user.isActive) {
      throw Error("Account Blocked Check your email");
    }

    if (typeof user === "boolean") {
      throw Error("No such user found");
    }

    // Setting JWT Tokens
    const payload: JWTPayload = {
      user: user._id,
      roles: user.role,
      organization: user.organization,
    };

    const access_token = createJwtAccessToken(
      payload,
      process.env.ACCESS_SECRET as string
    );
    const refresh_token = createJwtRefreshToken(
      payload,
      process.env.REFRESH_SECRET as string
    );

    return res.status(200).json({
      user: user,
      access_token,
      refresh_token,
      success: true,
      message: "Users successfully Logged In",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
