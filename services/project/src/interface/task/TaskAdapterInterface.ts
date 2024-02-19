import { Task } from "../../Entities/Task";
import { SimpleFilter } from "../../constants/props/SimpleFilter";

export interface TaskAdapterInterface {
  getTask(slug: string): Promise<Task | boolean>;
  getTasks(organizationId: string): Promise<Task[] | boolean>;
  getTasksByProjectId(projectSlug: string): Promise<Task[] | boolean>;
  getTasksByUserId(
    userId: string,
    filter: SimpleFilter,
    skip: number,
    limit: number
  ): Promise<Task[] | boolean>;
  getTaskLength(
    userId: string,
    filter: SimpleFilter
  ): Promise<number | boolean>;
  createTask(task: Task): Promise<Task | boolean>;
  updateTask(slug: string, task: Task): Promise<Task | boolean>;
  deleteTask(slug: string): Promise<Task | boolean>;
}
