import { injectable } from "inversify";
import { Task } from "../../../../Entities/Task";
import { createTask } from "./functions/createTask.adapter";
import { getTask } from "./functions/getTask.adapter";
import { getTasks } from "./functions/getTasks.adapter";
import { TaskAdapterInterface } from "../../../../interface/task/TaskAdapterInterface";
import { deleteTask } from "./functions/deleteTask.adapter";
import { getTasksByProjectId } from "./functions/getTasksByProjectId.adapter";
import { updateTask } from "./functions/updateTask.adapter";
import { getTasksByUserId } from "./functions/getTasksByUserId.adapter";

@injectable()
export class TaskAdapter implements TaskAdapterInterface {
  async getTask(slug: string): Promise<boolean | Task> {
    return getTask(slug);
  }

  async getTasks(organizationId: string): Promise<boolean | Task[]> {
    return getTasks(organizationId);
  }

  async getTasksByProjectId(projectSlug: string): Promise<boolean | Task[]> {
    return getTasksByProjectId(projectSlug);
  }

  async createTask(Task: Task): Promise<boolean | Task> {
    return createTask(Task);
  }

  async getTasksByUserId(userSlug: string): Promise<boolean | Task[]> {
    return getTasksByUserId(userSlug);
  }

  async updateTask(slug: string, task: Task): Promise<boolean | Task> {
    return updateTask(slug, task);
  }

  async deleteTask(id: string): Promise<boolean | Task> {
    return deleteTask(id);
  }
}
