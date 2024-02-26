import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";

export const checkCredentials = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface
) => {
  try {
    const { email, username, phoneNumber } = req.query;

    let exists = await iAuthUseCase.checkCredentialExists(
      email as string,
      phoneNumber as string,
      username as string
    );

    return res.status(200).json({
      user: exists,
      success: true,
      message: "Check Credentials",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
