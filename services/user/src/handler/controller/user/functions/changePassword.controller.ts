import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import passwordValidate from "../../../../util/validation/password.validate";
import { User } from "../../../../Entities/User";
import bcrypt from "bcrypt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const changePassword = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface
) => {
  const body = req.body;
  try {
    if (body.oldPassword === body.password) {
      throw Error("Use different password");
    }

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    const user = await iUserUseCase.getUser(data.user);

    if (!user) {
      throw Error("User didn't found");
    }

    let temp = user as User;

    const match = await bcrypt.compare(body.oldPassword, temp.password);

    if (!match) {
      throw Error("Old Password is incorrect!");
    }

    const hash = await passwordValidate(body.password, body.confirmPassword);
    const updatedUser = await iUserUseCase.changePassword(temp._id, hash);

    return res.status(200).json({
      user: updatedUser,
      success: true,
      message: "Password Successfully updated",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
