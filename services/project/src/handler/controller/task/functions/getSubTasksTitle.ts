import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getSubTasksTitle = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);

    let subTasksList = await iTaskUseCase.getSubTaskTitle(data.organization);
    if (!subTasksList) {
      throw Error("No task found");
    }

    return res.status(200).json({
      subTasksList: subTasksList,
      success: true,
      message: "Tasks successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
