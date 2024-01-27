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

// Database connection
connectToDatabase();

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

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
