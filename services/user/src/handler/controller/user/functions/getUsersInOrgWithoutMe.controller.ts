import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { validateJwt } from "@recurring/shared_library";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getUsersInOrgWithoutMe = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const { organization, user } = validateJwt(
      access_token,
      process.env.ACCESS_SECRET ?? ""
    );

    let users = await iUserUseCase.getUsersInOrgWithoutMe(organization, user);

    return res.status(200).json({
      users: users,
      success: true,
      message: "Users List Successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
