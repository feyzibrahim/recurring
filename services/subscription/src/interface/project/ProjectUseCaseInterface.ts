import { Project } from "../../Entities/Project";

export interface ProjectUseCaseInterface {
  getProject(id: string): Promise<Project | boolean>;
  getProjectByUserId(userId: string): Promise<Project | boolean>;
  createProject(project: Project): Promise<Project | boolean>;
  updateProject(id: string, project: Project): Promise<Project | boolean>;
}
