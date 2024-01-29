import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createOrganization = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  try {
    let body = req.body as Organization;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    let organization = await iOrgUseCase.getOrganizationByUserId(data.user);
    if (organization) {
      throw Error("Organization Already Exists");
    }

    body.admin = data.user;

    let org = (await iOrgUseCase.createOrganization(body)) as Organization;

    return res.status(200).json({
      organization: org,
      success: true,
      message: "Organization successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
