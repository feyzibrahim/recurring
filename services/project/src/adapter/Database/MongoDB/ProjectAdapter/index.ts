import { injectable } from "inversify";
import { Project } from "../../../../Entities/Project";
import { createProject } from "./functions/createProject.adapter";
import { getProject } from "./functions/getProject.adapter";
import { getProjects } from "./functions/getProjects.adapter";
import { ProjectAdapterInterface } from "../../../../interface/project/ProjectAdapterInterface";
import { deleteProject } from "./functions/deleteProject.adapter";
import { appendProjectMember } from "./functions/appendProjectMember";
import { updateProject } from "./functions/updateProject.adapter";

@injectable()
export class ProjectAdapter implements ProjectAdapterInterface {
  async getProject(slug: string): Promise<boolean | Project> {
    return getProject(slug);
  }

  async createProject(Project: Project): Promise<boolean | Project> {
    return createProject(Project);
  }

  async getProjectByUserId(userId: string): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }

  async updateProject(
    slug: string,
    project: Project
  ): Promise<boolean | Project> {
    return updateProject(slug, project);
  }

  async getProjects(organizationId: string): Promise<boolean | Project[]> {
    return getProjects(organizationId);
  }

  async deleteProject(id: string): Promise<boolean | Project> {
    return deleteProject(id);
  }

  async appendProjectMember(
    projectId: string,
    userId: string
  ): Promise<boolean | Project> {
    return appendProjectMember(projectId, userId);
  }
}
