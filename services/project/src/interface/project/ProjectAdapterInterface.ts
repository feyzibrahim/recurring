import { Project } from "../../Entities/Project";
import CountByDay from "../../constants/types/CountByDay";

export interface ProjectAdapterInterface {
  getProject(slug: string): Promise<Project | boolean>;
  getProjects(params: Record<string, string>): Promise<Project[] | boolean>;
  getProjectByUserId(userId: string): Promise<Project | boolean>;
  getProjectsByManagerId(managerId: string): Promise<Project[] | boolean>;
  createProject(project: Project): Promise<Project | boolean>;
  updateProject(slug: string, project: Project): Promise<Project | boolean>;
  deleteProject(id: string): Promise<Project | boolean>;
  appendProjectMember(
    projectId: string,
    userId: string
  ): Promise<Project | boolean>;
  getProjectsCompletedCount(
    organizationId: string
  ): Promise<CountByDay[] | false>;
  getProjectsCompletedCountForManager(
    managerId: string
  ): Promise<CountByDay[] | false>;
  getProjectsCompletedCountForEmployee(
    employeeId: string
  ): Promise<CountByDay[] | false>;
}
