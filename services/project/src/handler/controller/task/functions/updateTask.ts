import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { Task } from "../../../../Entities/Task";

export const updateTask = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { slug } = req.params;
    const task = req.body as Task;

    let updatedTask = await iTaskUseCase.updateTask(slug, task);
    if (!updatedTask) {
      throw Error("No task found");
    }

    return res.status(200).json({
      task: updatedTask,
      success: true,
      message: "Task successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
