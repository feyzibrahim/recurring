import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import validator from "validator";
import { User } from "../../../../Entities/User";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../../util/JWT/create.jwt";
import cookieConfig from "../../../../constants/cookieConfig";
import { sendPasswordForgetLink } from "../../../../util/nodemailer/sendPasswordForgetLink";

export const forgotPassword = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  const body: any = req.body;

  try {
    if (!body.username) {
      throw Error("Email or Username is required");
    }

    let user: User | boolean;
    if (validator.isEmail(body.username)) {
      user = await iAuthUseCase.fetchUserWithEmail(body.username);
    } else {
      user = await iAuthUseCase.fetchUserWithUsername(body.username);
    }

    if (!user) {
      throw Error("No Such User found");
    }

    await sendPasswordForgetLink(user as User);

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

  return null;
};
