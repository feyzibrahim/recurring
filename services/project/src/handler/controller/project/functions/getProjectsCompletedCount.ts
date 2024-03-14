import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getProjectsCompletedCount = async (
  req: Request,
  res: Response,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);
    console.log("file: getProjectsCompletedCount.ts:13 -> data", data);

    let projectsCount;
    if (data.roles === "owner") {
      projectsCount = await iProjectUseCase.getProjectsCompletedCount(
        data.organization
      );
    }

    if (data.roles === "manager") {
      projectsCount = await iProjectUseCase.getProjectsCompletedCountForManager(
        data.user
      );
    }
    if (data.roles === "employee") {
      projectsCount =
        await iProjectUseCase.getProjectsCompletedCountForEmployee(data.user);
    }
    if (!projectsCount) {
      throw Error("No project found");
    }

    return res.status(200).json({
      projectsCount: projectsCount,
      success: true,
      message: "Projects count successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
