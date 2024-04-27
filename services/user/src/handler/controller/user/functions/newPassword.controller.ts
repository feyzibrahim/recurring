import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import passwordValidate from "../../../../util/validation/password.validate";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const newPassword = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface
) => {
  const { password, confirmPassword } = req.body;

  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    const hash = await passwordValidate(password, confirmPassword);

    const user = await iUserUseCase.changePassword(data.user, hash);

    return res.status(200).json({
      user: user,
      success: true,
      message: "New Password Successfully Set",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
