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
import { SimpleFilter } from "../../../../constants/props/SimpleFilter";
import { getTaskLength } from "./functions/getTaskLength.adapter";
import { getTaskLengthByProject } from "./functions/getTaskLengthByProject.adapter";
import CountByDay from "../../../../constants/types/CountByDay";
import { getTaskCompletedCount } from "./functions/getTaskCompletedCount.adapter";
import { getNewTaskCount } from "./functions/getNewTaskCount.adapter";
import { getTaskCount } from "./functions/getTaskCount.adapter";
import TaskCount from "../../../../constants/types/TaskCount";
import { getTasksForUser } from "./functions/getTasksForUser.adapter";
import { getNewTaskCountForEmployee } from "./functions/getNewTaskCountForEmployee.adapter";
import { getTaskCompletedCountForEmployee } from "./functions/getTaskCompletedCountForEmployee.adapter";
import { getTaskCountForEmployee } from "./functions/getTaskCountForEmployee.adapter";
import { replayToTask } from "./functions/replayToTask.adapter";
import { Replay } from "../../../../Entities/Replay";
import { getSubTaskTitle } from "./functions/getSubTaskTitle.adapter";

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

  async getTasksByUserId(
    userSlug: string,
    filter: SimpleFilter,
    skip: number,
    limit: number
  ): Promise<boolean | Task[]> {
    return getTasksByUserId(userSlug, filter, skip, limit);
  }
  async getTasksForUser(userSlug: string): Promise<boolean | Task[]> {
    return getTasksForUser(userSlug);
  }
  async getTaskLength(
    userSlug: string,
    filter: SimpleFilter
  ): Promise<boolean | number> {
    return getTaskLength(userSlug, filter);
  }

  async getTaskLengthByProject(
    projectSlug: string,
    filter: SimpleFilter
  ): Promise<number | boolean> {
    return getTaskLengthByProject(projectSlug, filter);
  }

  async updateTask(slug: string, task: Task): Promise<boolean | Task> {
    return updateTask(slug, task);
  }

  async deleteTask(id: string): Promise<boolean | Task> {
    return deleteTask(id);
  }

  async getTaskCount(
    organizationId: string,
    interval: string
  ): Promise<false | TaskCount[]> {
    return getTaskCount(organizationId, interval);
  }

  async getTaskCountForEmployee(
    organizationId: string,
    interval: string
  ): Promise<false | TaskCount[]> {
    return getTaskCountForEmployee(organizationId, interval);
  }

  async getNewTaskCount(organizationId: string): Promise<false | CountByDay[]> {
    return getNewTaskCount(organizationId);
  }

  async getTaskCompletedCount(
    organizationId: string
  ): Promise<false | CountByDay[]> {
    return getTaskCompletedCount(organizationId);
  }

  async getTaskCompletedCountForEmployee(
    employeeId: string
  ): Promise<false | CountByDay[]> {
    return getTaskCompletedCountForEmployee(employeeId);
  }
  async getNewTaskCountForEmployee(
    employeeId: string
  ): Promise<false | CountByDay[]> {
    return getNewTaskCountForEmployee(employeeId);
  }

  async replayToTask(
    slug: string,
    noteId: string,
    replay: Replay
  ): Promise<Task | false> {
    return replayToTask(slug, noteId, replay);
  }

  async getSubTaskTitle(organizationId: string): Promise<any> {
    return getSubTaskTitle(organizationId);
  }
}
