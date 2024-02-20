import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { Project } from "../../../../Entities/Project";

export const getTasksByProjectId = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const { projectSlug } = req.params;

    const project = (await iProjectUseCase.getProject(projectSlug)) as Project;

    let tasks = await iTaskUseCase.getTasksByProjectId(project._id);
    if (!tasks) {
      throw Error("No task found");
    }

    let length = await iTaskUseCase.getTaskLengthByProject(project._id, {});

    return res.status(200).json({
      length: length,
      tasks: tasks,
      success: true,
      message: "Task successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
