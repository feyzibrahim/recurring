import { injectable } from "inversify";
import { Project } from "../../../../Entities/Project";
import { createProject } from "./functions/createProject.adapter";
import { getProject } from "./functions/getProject.adapter";
import { ProjectAdapterInterface } from "../../../../interface/project/ProjectAdapterInterface";

@injectable()
export class ProjectAdapter implements ProjectAdapterInterface {
  async getProject(id: string): Promise<boolean | Project> {
    return getProject(id);
  }

  async createProject(Project: Project): Promise<boolean | Project> {
    return createProject(Project);
  }

  async getProjectByUserId(userId: string): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }
  async updateProject(
    id: string,
    project: Project
  ): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }
}
