import { inject, injectable } from "inversify";
import { TaskUseCaseInterface } from "../interface/task/TaskUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Task } from "../Entities/Task";

@injectable()
export class TaskUseCase implements TaskUseCaseInterface {
  constructor(
    @inject(TYPES.TaskAdapterInterface)
    private iTaskUseCase: TaskUseCaseInterface
  ) {}

  getTask(slug: string): Promise<boolean | Task> {
    return this.iTaskUseCase.getTask(slug);
  }

  getTasks(organizationId: string): Promise<boolean | Task[]> {
    return this.iTaskUseCase.getTasks(organizationId);
  }

  getTasksByProjectId(projectId: string): Promise<boolean | Task[]> {
    return this.iTaskUseCase.getTasksByProjectId(projectId);
  }

  createTask(task: Task): Promise<boolean | Task> {
    return this.iTaskUseCase.createTask(task);
  }

  getTasksByUserId(userId: string): Promise<boolean | Task[]> {
    return this.iTaskUseCase.getTasksByUserId(userId);
  }

  updateTask(id: string, task: Task): Promise<boolean | Task> {
    return this.iTaskUseCase.updateTask(id, task);
  }

  deleteTask(id: string): Promise<boolean | Task> {
    return this.iTaskUseCase.deleteTask(id);
  }
}
