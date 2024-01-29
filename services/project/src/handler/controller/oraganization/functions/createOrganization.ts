import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { User } from "../../../../Entities/User";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createOrganization = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface,
  iUserUseCase: UserUseCaseInterface
) => {
  try {
    let body = req.body;

    let admin = body.admin;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    let organization = await iOrgUseCase.getOrganization(admin);
    if (organization) {
      throw Error("Organization Already Exists");
    }

    let org = (await iOrgUseCase.createOrganization(body)) as Organization;

    let user = { organization: org._id, _id: data.user } as User;

    let temp = await iUserUseCase.updateUser(user);
    console.log("Log: temp", temp);

    return res.status(200).json({
      user: temp,
      organization: org,
      success: true,
      message: "Organization successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
