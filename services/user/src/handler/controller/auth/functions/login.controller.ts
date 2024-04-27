import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import {
  JWTPayload,
  createJwtAccessToken,
  createJwtRefreshToken,
} from "@recurring/shared_library";
import validateUserOnLogin from "../../../../util/validation/login.validate";

export const login = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  const userData: any = req.body;

  try {
    let user: User | boolean = await validateUserOnLogin(
      userData,
      iAuthUseCase
    );

    if (typeof user !== "boolean" && !user.isActive) {
      throw Error("Account Blocked Check your email");
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
