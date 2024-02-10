import { Task } from "../../Entities/Task";

export interface TaskUseCaseInterface {
  getTask(slug: string): Promise<Task | boolean>;
  getTasks(organizationId: string): Promise<Task[] | boolean>;
  getTasksByProjectId(projectSlug: string): Promise<Task[] | boolean>;
  getTasksByUserId(userId: string): Promise<Task[] | boolean>;
  createTask(task: Task): Promise<Task | boolean>;
  updateTask(slug: string, task: Task): Promise<Task | boolean>;
  deleteTask(slug: string): Promise<Task | boolean>;
}
