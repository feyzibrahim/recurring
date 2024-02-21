import { Project } from "../../Entities/Project";

export interface ProjectUseCaseInterface {
  getProject(slug: string): Promise<Project | boolean>;
  getProjects(organizationId: string): Promise<Project[] | boolean>;
  getProjectByUserId(userId: string): Promise<Project | boolean>;
  getProjectsByManagerId(managerId: string): Promise<Project[] | boolean>;
  createProject(project: Project): Promise<Project | boolean>;
  updateProject(slug: string, project: Project): Promise<Project | boolean>;
  deleteProject(slug: string): Promise<Project | boolean>;
  appendProjectMember(
    projectId: string,
    userId: string
  ): Promise<Project | boolean>;
}
