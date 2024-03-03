import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { validateJwt } from "@recurring/shared_library";

export const getProject = async (
  req: Request,
  res: Response,
  iOrgUseCase: ProjectUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(process.env.ACCESS_SECRET as string, access_token);

    let org = await iOrgUseCase.getProjectByUserId(data.user);
    if (!org) {
      throw Error("No project found");
    }

    return res.status(200).json({
      project: org,
      success: true,
      message: "Project successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
