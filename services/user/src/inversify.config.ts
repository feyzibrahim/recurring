import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { AuthController } from "./handler/controller/auth/AuthController";
import { AuthUseCase } from "./useCases/AuthUseCase";
import { AuthAdapter } from "./adapter/Database/MongoDB/AuthAdapter";
import { AuthAdapterInterface } from "./interface/auth/AuthAdapterInterface";
import { TYPES } from "./constants/types/types";
import { AuthUseCaseInterface } from "./interface/auth/AuthUseCaseInterface";
import { UserController } from "./handler/controller/user/UserController";
import { UserUseCase } from "./useCases/UserUseCase";
import { UserUseCaseInterface } from "./interface/user/UserUseCaseInterface";
import { UserAdapterInterface } from "./interface/user/UserAdapterInterface";
import { UserAdapter } from "./adapter/Database/MongoDB/UserAdapter";
import { OrganizationController } from "./handler/controller/oraganization/OrganizationController";
import { OrganizationUseCase } from "./useCases/OrganizationUseCase";
import { OrganizationUseCaseInterface } from "./interface/organization/OrganizationUseCaseInterface";
import { OrganizationAdapterInterface } from "./interface/organization/OrganizationAdapterInterface";
import { OrganizationAdapter } from "./adapter/Database/MongoDB/OrganizationAdapter";
import { RabbitMQService } from "./infra/rabbitmq/rabbitmq.service";
import { RabbitMQUseCaseInterface } from "./interface/rabbitmq/RabbitMQUseCaseInterface";
import { RabbitMQUseCase } from "./useCases/RabbitMQUseCase";
// import { connectRabbitMq } from "./infra/rabbitmq/rabbitmqConnection";

// Database connection
connectToDatabase();

// Message Brocker Connection | RabbitMQ
// connectRabbitMq();

const container = new Container();

// Auth Injection
container
  .bind<AuthAdapterInterface>(TYPES.AuthAdapterInterface)
  .to(AuthAdapter);
container
  .bind<AuthUseCaseInterface>(TYPES.AuthUseCaseInterface)
  .to(AuthUseCase);
container.bind<AuthController>(AuthController).toSelf();
container.bind<AuthUseCase>(AuthUseCase).toSelf();

// User Injection
container.bind<UserController>(UserController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();
container
  .bind<UserUseCaseInterface>(TYPES.UserUseCaseInterface)
  .to(UserUseCase);
container
  .bind<UserAdapterInterface>(TYPES.UserAdapterInterface)
  .to(UserAdapter);

// Organization Injection
container.bind<OrganizationController>(OrganizationController).toSelf();
container.bind<OrganizationUseCase>(OrganizationUseCase).toSelf();
container
  .bind<OrganizationUseCaseInterface>(TYPES.OrganizationUseCaseInterface)
  .to(OrganizationUseCase);
container
  .bind<OrganizationAdapterInterface>(TYPES.OrganizationAdapterInterface)
  .to(OrganizationAdapter);

// RabbitMQ
container
  .bind<RabbitMQService>(TYPES.RabbitMQServiceInitializer)
  .to(RabbitMQService)
  .inSingletonScope();
container
  .bind<RabbitMQUseCaseInterface>(TYPES.RabbitMQUseCaseInterface)
  .to(RabbitMQUseCase);

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
