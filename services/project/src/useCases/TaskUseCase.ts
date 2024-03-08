import { inject, injectable } from "inversify";
import { TaskUseCaseInterface } from "../interface/task/TaskUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Task } from "../Entities/Task";
import { SimpleFilter } from "../constants/props/SimpleFilter";
import CountByDay from "../constants/types/CountByDay";
import TaskCount from "../constants/types/TaskCount";
import { Replay } from "../Entities/Replay";

@injectable()
export class TaskUseCase implements TaskUseCaseInterface {
  constructor(
    @inject(TYPES.TaskAdapterInterface)
    private iTaskUseCase: TaskUseCaseInterface
  ) {}
  getTaskCount(
    organizationId: string,
    interval: string
  ): Promise<false | TaskCount[]> {
    return this.iTaskUseCase.getTaskCount(organizationId, interval);
  }

  getTaskCountForEmployee(
    employeeId: string,
    interval: string
  ): Promise<false | TaskCount[]> {
    return this.iTaskUseCase.getTaskCountForEmployee(employeeId, interval);
  }

  getTaskLengthByProject(
    projectSlug: string,
    filter: SimpleFilter
  ): Promise<number | boolean> {
    return this.iTaskUseCase.getTaskLengthByProject(projectSlug, filter);
  }
  getTaskLength(
    userId: string,
    filter: SimpleFilter
  ): Promise<number | boolean> {
    return this.iTaskUseCase.getTaskLength(userId, filter);
  }

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

  getTasksByUserId(
    userId: string,
    filter: SimpleFilter,
    skip: number,
    limit: number
  ): Promise<boolean | Task[]> {
    return this.iTaskUseCase.getTasksByUserId(userId, filter, skip, limit);
  }
  getTasksForUser(userId: string): Promise<boolean | Task[]> {
    return this.iTaskUseCase.getTasksForUser(userId);
  }

  updateTask(id: string, task: Task): Promise<boolean | Task> {
    return this.iTaskUseCase.updateTask(id, task);
  }

  deleteTask(id: string): Promise<boolean | Task> {
    return this.iTaskUseCase.deleteTask(id);
  }

  getNewTaskCount(organizationId: string): Promise<false | CountByDay[]> {
    return this.iTaskUseCase.getNewTaskCount(organizationId);
  }
  getTaskCompletedCount(organizationId: string): Promise<false | CountByDay[]> {
    return this.iTaskUseCase.getTaskCompletedCount(organizationId);
  }

  getNewTaskCountForEmployee(
    employeeId: string
  ): Promise<false | CountByDay[]> {
    return this.iTaskUseCase.getNewTaskCountForEmployee(employeeId);
  }
  getTaskCompletedCountForEmployee(
    employeeId: string
  ): Promise<false | CountByDay[]> {
    return this.iTaskUseCase.getTaskCompletedCountForEmployee(employeeId);
  }

  replayToTask(
    slug: string,
    noteId: string,
    replay: Replay
  ): Promise<Task | false> {
    return this.iTaskUseCase.replayToTask(slug, noteId, replay);
  }
  getSubTaskTitle(organizationId: string): Promise<any> {
    return this.iTaskUseCase.getSubTaskTitle(organizationId);
  }
}
