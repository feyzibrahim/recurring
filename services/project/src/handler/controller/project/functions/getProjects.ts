import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getProjects = async (
  req: Request,
  res: Response,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    let params: Record<string, string> = {};

    if (data.roles === "owner") {
      params.organization = data.organization;
    }

    if (data.roles === "manager") {
      params.manager = data.user;
    }

    if (data.roles === "employee") {
      params.members = data.user;
    }

    let projects = await iProjectUseCase.getProjects(params);
    if (!projects) {
      throw Error("No project found");
    }

    return res.status(200).json({
      projects: projects,
      success: true,
      message: "Projects successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
