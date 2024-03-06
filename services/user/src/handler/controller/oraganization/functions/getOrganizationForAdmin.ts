import { Request, Response } from "express";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";

export const getOrganizationForAdmin = async (
  req: Request,
  res: Response,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  try {
    let organizations = await iOrgUseCase.getOrganizationForAdmin();
    if (!organizations) {
      throw Error("No organizations found");
    }

    return res.status(200).json({
      organizations: organizations,
      success: true,
      message: "Organizations successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
