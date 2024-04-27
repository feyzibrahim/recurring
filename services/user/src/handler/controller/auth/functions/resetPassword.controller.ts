import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { validateVerificationToken } from "../../../../util/JWT/emailVerification.jwt";
import passwordValidate from "../../../../util/validation/password.validate";
import {
  JWTPayload,
  createJwtAccessToken,
  createJwtRefreshToken,
} from "@recurring/shared_library";
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

    let tempUser = user as User;

    // Setting JWT Tokens
    const payload: JWTPayload = {
      user: tempUser._id,
      roles: tempUser.role,
      organization: tempUser.organization,
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

    return res.status(200).json({
      user: user,
      access_token,
      refresh_token,
      success: true,
      message: "Password Reset Success",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
