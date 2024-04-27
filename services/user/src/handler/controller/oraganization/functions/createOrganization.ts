import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import cookieConfig from "../../../../constants/cookieConfig";
import { createJwtAccessToken } from "../../../../util/JWT/create.jwt";
import { User } from "../../../../Entities/User";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createOrganization = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  try {
    let body = req.body as Organization;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    let organization = await iOrgUseCase.getOrganizationByUserId(data.user);
    if (organization) {
      throw Error("Organization Already Exists");
    }

    body.admin = data.user;

    let org = (await iOrgUseCase.createOrganization(body)) as Organization;

    let user = {
      _id: data.user,
      role: data.role,
      organization: org._id,
    };

    const access_token_new = createJwtAccessToken(user as User);
    res.cookie("access_token", access_token_new, cookieConfig);

    return res.status(200).json({
      organization: org,
      success: true,
      message: "Organization successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
