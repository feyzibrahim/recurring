import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { validateVerificationToken } from "../../../../util/JWT/emailVerification.jwt";
import passwordValidate from "../../../../util/validation/password.validate";
import {
  createJwtAccessToken,
  createJwtRefreshToken,
} from "../../../../util/JWT/create.jwt";
import cookieConfig from "../../../../constants/cookieConfig";
import { User } from "../../../../Entities/User";

export const resetPassword = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    if (!token) {
      throw Error("Token Not found");
    }
    const data = validateVerificationToken(token);

    const hash = await passwordValidate(password, confirmPassword);

    const user = await iAuthUseCase.resetPassword(hash, data.user);

    // Setting JWT Tokens
    const access_token = createJwtAccessToken(user as User);
    const refresh_token = createJwtRefreshToken(user as User);
    res.cookie("access_token", access_token, cookieConfig);
    res.cookie("refresh_token", refresh_token, cookieConfig);

    return res.status(200).json({
      user: user,
      success: true,
      message: "Password Reset Success",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
