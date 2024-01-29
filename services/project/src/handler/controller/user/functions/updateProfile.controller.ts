import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { User } from "../../../../Entities/User";

export const updateProfile = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface
) => {
  const body = req.body as User;
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    let user = (await iUserUseCase.getUser(data.user)) as User;

    if (!user) {
      throw Error("User didn't found");
    }

    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;
    user.dateOfBirth = body.dateOfBirth;
    user.phoneNumber = body.phoneNumber;

    const updatedUser = await iUserUseCase.updateUser(user);

    return res.status(200).json({
      user: updatedUser,
      success: true,
      message: "Profile Successfully updated",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
