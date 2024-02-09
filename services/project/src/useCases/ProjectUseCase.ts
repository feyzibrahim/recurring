import { inject, injectable } from "inversify";
import { ProjectUseCaseInterface } from "../interface/project/ProjectUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Project } from "../Entities/Project";

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

  createProject(project: Project): Promise<boolean | Project> {
    return this.iProjectUseCase.createProject(project);
  }

  updateProject(id: string, project: Project): Promise<boolean | Project> {
    return this.iProjectUseCase.updateProject(id, project);
  }

  getProjects(organizationId: string): Promise<boolean | Project[]> {
    return this.iProjectUseCase.getProjects(organizationId);
  }

  deleteProject(id: string): Promise<boolean | Project> {
    return this.iProjectUseCase.deleteProject(id);
  }
}
