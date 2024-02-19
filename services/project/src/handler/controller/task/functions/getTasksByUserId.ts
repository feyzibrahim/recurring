import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";

export const getTasksByUserId = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { userSlug } = req.params;

    const { filter, limit, skip } = simpleQueryFilter(req);

    let tasks = await iTaskUseCase.getTasksByUserId(
      userSlug,
      filter,
      limit,
      skip
    );
    if (!tasks) {
      throw Error("No task found");
    }

    let length = await iTaskUseCase.getTaskLength(userSlug, filter);

    return res.status(200).json({
      tasks: tasks,
      length: length,
      success: true,
      message: "Task successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
