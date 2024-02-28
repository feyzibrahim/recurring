import { Task } from "../../Entities/Task";
import { SimpleFilter } from "../../constants/props/SimpleFilter";
import CountByDay from "../../constants/types/CountByDay";
import TaskCount from "../../constants/types/TaskCount";

export interface TaskUseCaseInterface {
  getTask(slug: string): Promise<Task | boolean>;
  getTasks(organizationId: string): Promise<Task[] | boolean>;
  getTasksByProjectId(projectSlug: string): Promise<Task[] | boolean>;
  getTasksByUserId(
    userId: string,
    filter: SimpleFilter,
    skip: number,
    limit: number
  ): Promise<Task[] | boolean>;
  getTasksForUser(userId: string): Promise<Task[] | boolean>;
  getTaskLength(
    userId: string,
    filter: SimpleFilter
  ): Promise<number | boolean>;
  getTaskLengthByProject(
    projectSlug: string,
    filter: SimpleFilter
  ): Promise<number | boolean>;
  createTask(task: Task): Promise<Task | boolean>;
  updateTask(slug: string, task: Task): Promise<Task | boolean>;
  deleteTask(slug: string): Promise<Task | boolean>;
  getTaskCompletedCount(organizationId: string): Promise<CountByDay[] | false>;
  getTaskCompletedCountForEmployee(
    employeeId: string
  ): Promise<CountByDay[] | false>;
  getNewTaskCount(organizationId: string): Promise<CountByDay[] | false>;
  getNewTaskCountForEmployee(employeeId: string): Promise<CountByDay[] | false>;
  getTaskCount(
    organizationId: string,
    interval: string
  ): Promise<TaskCount[] | false>;
  getTaskCountForEmployee(
    employeeId: string,
    interval: string
  ): Promise<TaskCount[] | false>;
}
