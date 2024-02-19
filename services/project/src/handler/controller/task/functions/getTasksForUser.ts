import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";

export const getTasksForUser = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;
    const data = validateJwt(access_token);
    const { filter, limit, skip } = simpleQueryFilter(req);

    let tasks = await iTaskUseCase.getTasksByUserId(
      data.user,
      filter,
      limit,
      skip
    );
    if (!tasks) {
      throw Error("No task found");
    }

    let length = await iTaskUseCase.getTaskLength(data.user, filter);

    return res.status(200).json({
      tasks: tasks,
      length: length,
      success: true,
      message: "Tasks successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
