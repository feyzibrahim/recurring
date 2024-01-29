import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const updateOrganization = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    const organization = req.body as Organization;
    console.log("updateOrganization: organization", organization);

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
