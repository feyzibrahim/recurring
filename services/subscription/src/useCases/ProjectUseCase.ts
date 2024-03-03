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
  getProject(id: string): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }
  getProjectByUserId(userId: string): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }
  createProject(project: Project): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }
  updateProject(id: string, project: Project): Promise<boolean | Project> {
    throw new Error("Method not implemented.");
  }
}
