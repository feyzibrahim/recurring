import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../../util/JWT/create.jwt";
import validateUserOnLogin from "../../../../util/validation/login.validate";
import cookieConfig from "../../../../constants/cookieConfig";

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

    // Setting JWT Tokens
    const access_token = createJwtAccessToken(user);
    const refresh_token = createJwtRefreshToken(user);
    res.cookie("access_token", access_token, cookieConfig);
    res.cookie("refresh_token", refresh_token, cookieConfig);

    return res.status(200).json({
      user: user,
      success: true,
      message: "Users successfully Logged In",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
