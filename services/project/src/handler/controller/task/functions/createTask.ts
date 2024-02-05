import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { Task } from "../../../../Entities/Task";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { Project } from "../../../../Entities/Project";

export const createTask = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    let body = req.body as Task;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    body.organization = data.organization;

    const project = (await iProjectUseCase.getProject(body.project)) as Project;

    body.project = project._id;

    let task = (await iTaskUseCase.createTask(body)) as Task;
    console.log("file: createTask.ts:21 -> task", task);

    return res.status(200).json({
      task: task,
      success: true,
      message: "Task successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
