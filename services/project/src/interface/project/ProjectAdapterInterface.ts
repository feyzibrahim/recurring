import { Project } from "../../Entities/Project";

export interface ProjectAdapterInterface {
  getProject(slug: string): Promise<Project | boolean>;
  getProjects(organizationId: string): Promise<Project[] | boolean>;
  getProjectByUserId(userId: string): Promise<Project | boolean>;
  createProject(project: Project): Promise<Project | boolean>;
  updateProject(slug: string, project: Project): Promise<Project | boolean>;
  deleteProject(id: string): Promise<Project | boolean>;
  appendProjectMember(
    projectId: string,
    userId: string
  ): Promise<Project | boolean>;
}
