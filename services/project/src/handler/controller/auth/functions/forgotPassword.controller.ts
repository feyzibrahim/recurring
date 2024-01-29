import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import validator from "validator";
import { User } from "../../../../Entities/User";
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

    return res.status(200).json({
      user: user,
      success: true,
      message: "Link successfully Sent to email",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
