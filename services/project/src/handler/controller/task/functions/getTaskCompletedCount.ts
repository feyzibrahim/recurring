import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const getTaskCompletedCount = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;
    const data = validateJwt(access_token);

    let tasksCount = await iTaskUseCase.getTaskCompletedCount(
      data.organization
    );
    let newTaskCount = await iTaskUseCase.getNewTaskCount(data.organization);
    if (!tasksCount) {
      throw Error("No task found");
    }

    return res.status(200).json({
      tasksCount: tasksCount,
      newTaskCount: newTaskCount,
      success: true,
      message: "Tasks count successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
