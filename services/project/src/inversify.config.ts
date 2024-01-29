import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { ProjectUseCase } from "./useCases/ProjectUseCase";
import { ProjectAdapter } from "./adapter/Database/MongoDB/ProjectAdapter";
import { ProjectAdapterInterface } from "./interface/project/ProjectAdapterInterface";
import { TYPES } from "./constants/types/types";
import { ProjectUseCaseInterface } from "./interface/project/ProjectUseCaseInterface";
import { ProjectController } from "./handler/controller/project/ProjectController";

// Database connection
connectToDatabase();

const container = new Container();

// Project Injection
container
  .bind<ProjectAdapterInterface>(TYPES.ProjectAdapterInterface)
  .to(ProjectAdapter);
container
  .bind<ProjectUseCaseInterface>(TYPES.ProjectUseCaseInterface)
  .to(ProjectUseCase);
container.bind<ProjectController>(ProjectController).toSelf();
container.bind<ProjectUseCase>(ProjectUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
