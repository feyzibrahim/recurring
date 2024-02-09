import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { Task } from "../../../../Entities/Task";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const updateTask = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    const task = req.body as Task;

    let newTask = await iTaskUseCase.updateTask(data.user, task);
    if (!newTask) {
      throw Error("No task found");
    }

    return res.status(200).json({
      task: newTask,
      success: true,
      message: "Task successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
