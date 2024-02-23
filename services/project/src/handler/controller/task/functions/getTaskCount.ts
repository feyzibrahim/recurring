import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const getTaskCount = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;
    const data = validateJwt(access_token);
    const { interval } = req.query;

    let taskDone = await iTaskUseCase.getTaskCount(
      data.organization,
      interval as string
    );

    return res.status(200).json({
      taskDone: taskDone,
      success: true,
      message: "Tasks count successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
