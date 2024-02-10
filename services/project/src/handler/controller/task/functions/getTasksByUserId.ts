import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";

export const getTasksByUserId = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { userSlug } = req.params;

    let tasks = await iTaskUseCase.getTasksByUserId(userSlug);
    if (!tasks) {
      throw Error("No task found");
    }

    return res.status(200).json({
      tasks: tasks,
      success: true,
      message: "Task successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
