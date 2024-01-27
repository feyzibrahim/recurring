import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../../util/JWT/create.jwt";
import validateUser from "../../../../util/validation/signup.validate";
import hashPassword from "../../../../util/hash/password.hash";
import { sendVerificationLink } from "../../../../util/nodemailer/sendVerificationLink";
import cookieConfig from "../../../../constants/cookieConfig";

export const signup = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  const userData: any = req.body;

  try {
    // Validate Password
    let user = await validateUser(userData, iAuthUseCase);

    // Hash Password
    user = await hashPassword(user);

    // Registering User to DB
    const newUser: User | boolean = await iAuthUseCase.signup(user);

    if (!newUser) {
      throw new Error("Cannot Signup Now! Please try Later");
    }

    await sendVerificationLink(newUser as User);

    // Setting JWT Tokens
    const access_token = createJwtAccessToken(newUser as User);
    const refresh_token = createJwtRefreshToken(newUser as User);
    res.cookie("access_token", access_token, cookieConfig);
    res.cookie("refresh_token", refresh_token, cookieConfig);

    return res.status(200).json({
      user: newUser,
      success: true,
      message: "Users successfully Registered",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
