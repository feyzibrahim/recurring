import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const updateOrganization = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    const organization = req.body as Organization;

    let org = await iOrgUseCase.updateOrganization(
      data.organization,
      organization
    );
    if (!org) {
      throw Error("No organization found");
    }

    return res.status(200).json({
      organization: org,
      success: true,
      message: "Organization successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
