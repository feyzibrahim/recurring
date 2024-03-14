import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getOrganization = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    let org = await iOrgUseCase.getOrganization(data.organization);
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
