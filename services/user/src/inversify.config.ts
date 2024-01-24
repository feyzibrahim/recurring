import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { AuthController } from "./handler/controller/auth/AuthController";
import { AuthUseCase } from "./useCases/AuthUseCase";
import { AuthAdapter } from "./adapter/Database/MongoDB/AuthAdapter";
import { AuthAdapterInterface } from "./interface/AuthAdapterInterface";
import { TYPES } from "./constants/types/types";
import { AuthUseCaseInterface } from "./interface/AuthUseCaseInterface";

// Database connection
connectToDatabase();

const container = new Container();

container
  .bind<AuthAdapterInterface>(TYPES.AuthAdapterInterface)
  .to(AuthAdapter);

container
  .bind<AuthUseCaseInterface>(TYPES.AuthUseCaseInterface)
  .to(AuthUseCase);

container.bind<AuthController>(AuthController).toSelf();
container.bind<AuthUseCase>(AuthUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
