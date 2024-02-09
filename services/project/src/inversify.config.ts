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
import { TaskAdapterInterface } from "./interface/task/TaskAdapterInterface";
import { TaskAdapter } from "./adapter/Database/MongoDB/TaskAdapter";
import { TaskUseCaseInterface } from "./interface/task/TaskUseCaseInterface";
import { TaskUseCase } from "./useCases/TaskUseCase";
import { TaskController } from "./handler/controller/task/TaskController";
import { RabbitMQService } from "./infra/rabbitmq/rabbitmq.service";
import { UserAdapterInterface } from "./interface/user/UserAdapterInterface";
import { UserAdapter } from "./adapter/Database/MongoDB/UserAdapter/UserAdapter";

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

// Task Injection
container
  .bind<TaskAdapterInterface>(TYPES.TaskAdapterInterface)
  .to(TaskAdapter);
container
  .bind<TaskUseCaseInterface>(TYPES.TaskUseCaseInterface)
  .to(TaskUseCase);
container.bind<TaskController>(TaskController).toSelf();
container.bind<TaskUseCase>(TaskUseCase).toSelf();

// User Injection
container
  .bind<UserAdapterInterface>(TYPES.UserAdapterInterface)
  .to(UserAdapter);

// RabbitMQ injection
container
  .bind<RabbitMQService>(TYPES.RabbitMQServiceInitializer)
  .to(RabbitMQService);

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
