import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getTasksByManagerId = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);

    const projects = await iProjectUseCase.getProjectsByManagerId(data.user);

    let tasks = [];
    if (typeof projects !== "boolean") {
      for (let project of projects) {
        let newTasks = await iTaskUseCase.getTasksByProjectId(project._id);
        if (typeof newTasks !== "boolean") {
          tasks.push(...newTasks);
        }
      }
    }

    if (!tasks) {
      throw Error("No task found");
    }

    let length = typeof tasks !== "boolean" && tasks.length;

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
