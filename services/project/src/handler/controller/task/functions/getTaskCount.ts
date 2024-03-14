import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getTaskCount = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);
    const { interval } = req.query;

    let taskDone;
    if (data.roles === "employee") {
      taskDone = await iTaskUseCase.getTaskCountForEmployee(
        data.user,
        interval as string
      );
    } else {
      taskDone = await iTaskUseCase.getTaskCount(
        data.organization,
        interval as string
      );
    }

    return res.status(200).json({
      taskDone: taskDone,
      success: true,
      message: "Tasks count successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
