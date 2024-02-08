import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import { validateVerificationToken } from "../../../../util/JWT/emailVerification.jwt";
import {
  JWTPayload,
  createJwtAccessToken,
  createJwtRefreshToken,
} from "@recurring/shared_library";

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

    // Setting JWT Tokens
    const payload: JWTPayload = {
      user: temp._id,
      role: temp.role,
      organization: temp.organization,
    };

    // Setting JWT Tokens
    const access_token = createJwtAccessToken(
      payload,
      process.env.ACCESS_SECRET as string
    );
    const refresh_token = createJwtRefreshToken(
      payload,
      process.env.REFRESH_SECRET as string
    );
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
