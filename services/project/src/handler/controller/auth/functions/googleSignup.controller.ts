import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import validateUserOnGoogleAuth from "../../../../util/google/validate.google";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../../util/JWT/create.jwt";
import cookieConfig from "../../../../constants/cookieConfig";

export const googleSignup = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  const body: any = req.body;

  try {
    const data = await validateUserOnGoogleAuth(body);
    const temp = {
      email: data?.email,
      firstName: data?.name,
      profileImageURL: data?.picture,
      isEmailVerified: true,
    };

    let user: User | boolean = await iAuthUseCase.fetchUserWithEmail(
      temp.email as string
    );

    if (!user) {
      user = await iAuthUseCase.signup(temp as User);
    }

    // Setting JWT Tokens
    const access_token = createJwtAccessToken(user as User);
    const refresh_token = createJwtRefreshToken(user as User);
    res.cookie("access_token", access_token, cookieConfig);
    res.cookie("refresh_token", refresh_token, cookieConfig);

    return res.status(200).json({
      user: user,
      success: true,
      message: "Users successfully Registered",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
