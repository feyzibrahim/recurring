import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { validateVerificationToken } from "../../../../util/JWT/emailVerification.jwt";

export const verifyPasswordReset = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  const { token } = req.params;

  try {
    if (!token) {
      throw Error("Token Not found");
    }

    const data = validateVerificationToken(token);

    let user = await iAuthUseCase.fetchUserWithEmail(data.user);
    if (!user) {
      throw Error("Invalid Email");
    }

    return res.status(200).json({
      user: user,
      success: true,
      message: "Password Link successfully Verified",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
