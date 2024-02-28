import { inject, injectable } from "inversify";
import { ProjectUseCaseInterface } from "../interface/project/ProjectUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Project } from "../Entities/Project";
import ProjectCountByDay from "../constants/types/CountByDay";

@injectable()
export class ProjectUseCase implements ProjectUseCaseInterface {
  constructor(
    @inject(TYPES.ProjectAdapterInterface)
    private iProjectUseCase: ProjectUseCaseInterface
  ) {}

  getProject(slug: string): Promise<boolean | Project> {
    return this.iProjectUseCase.getProject(slug);
  }

  getProjectByUserId(userId: string): Promise<boolean | Project> {
    return this.iProjectUseCase.getProjectByUserId(userId);
  }
  getProjectsByManagerId(managerId: string): Promise<boolean | Project[]> {
    return this.iProjectUseCase.getProjectsByManagerId(managerId);
  }

  createProject(project: Project): Promise<boolean | Project> {
    return this.iProjectUseCase.createProject(project);
  }

  updateProject(slug: string, project: Project): Promise<boolean | Project> {
    return this.iProjectUseCase.updateProject(slug, project);
  }

  getProjects(params: Record<string, string>): Promise<boolean | Project[]> {
    return this.iProjectUseCase.getProjects(params);
  }

  deleteProject(id: string): Promise<boolean | Project> {
    return this.iProjectUseCase.deleteProject(id);
  }

  appendProjectMember(
    projectId: string,
    userId: string
  ): Promise<boolean | Project> {
    return this.iProjectUseCase.appendProjectMember(projectId, userId);
  }
  getProjectsCompletedCount(
    organizationId: string
  ): Promise<ProjectCountByDay[] | false> {
    return this.iProjectUseCase.getProjectsCompletedCount(organizationId);
  }
  getProjectsCompletedCountForManager(
    managerId: string
  ): Promise<false | ProjectCountByDay[]> {
    return this.iProjectUseCase.getProjectsCompletedCountForManager(managerId);
  }
  getProjectsCompletedCountForEmployee(
    employeeId: string
  ): Promise<false | ProjectCountByDay[]> {
    return this.iProjectUseCase.getProjectsCompletedCountForEmployee(
      employeeId
    );
  }
}
