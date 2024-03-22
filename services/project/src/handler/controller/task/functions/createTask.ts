import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { Task } from "../../../../Entities/Task";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { Project } from "../../../../Entities/Project";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createTask = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    let body = req.body as Task;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    body.organization = data.organization;

    const project = (await iProjectUseCase.getProject(body.project)) as Project;

    body.project = project._id;

    let task = (await iTaskUseCase.createTask(body)) as Task;

    let newProject;
    if (project.members.length === 0 && typeof task.assignee !== "string") {
      newProject = await iProjectUseCase.appendProjectMember(
        project._id,
        task.assignee._id
      );
    } else {
      const test = project.members.filter((mem: any) => {
        if (typeof task.assignee !== "string") {
          if (mem._id.toString() !== task.assignee._id.toString()) {
            return mem;
          }
        }
      });

      if (test.length === 0 && typeof task.assignee !== "string") {
        newProject = await iProjectUseCase.appendProjectMember(
          project._id,
          task.assignee._id
        );
      }
    }

    return res.status(200).json({
      task: task,
      project: newProject,
      success: true,
      message: "Task successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
