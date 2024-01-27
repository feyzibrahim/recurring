import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import { validateVerificationToken } from "../../../../util/JWT/emailVerification.jwt";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../../util/JWT/create.jwt";

const cookieConfig = {
  secure: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  try {
    const { token } = req.params;
    if (!token) {
      throw Error("Token Not found");
    }

    const data = validateVerificationToken(token);

    if (!data.user) {
      throw Error("No Id is sent");
    }

    let user = await iAuthUseCase.fetchUserWithEmail(data.user);

    if (!user) {
      throw Error("Invalid Email");
    }
    let temp = user as User;
    user = await iAuthUseCase.updateUserStatusAfterEmailValidation(temp._id);

    const access_token = createJwtAccessToken(user as User);
    const refresh_token = createJwtRefreshToken(user as User);
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
