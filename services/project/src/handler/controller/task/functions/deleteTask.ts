import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";

export const deleteTask = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { slug } = req.params;

    let task = await iTaskUseCase.deleteTask(slug as string);
    if (!task) {
      throw Error("No task found");
    }

    return res.status(200).json({
      task: task,
      success: true,
      message: "Task successfully Deleted",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
