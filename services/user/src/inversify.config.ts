import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { AuthController } from "./handler/controller/auth/AuthController";
import { AuthUseCase } from "./useCases/AuthUseCase";
import { AuthInterface } from "./interface/AuthInterface";
import { AuthAdapter } from "./adapter/Database/MongoDB/AuthAdapter";

// Database connection
connectToDatabase();

const container = new Container();

container.bind<AuthInterface>("AuthInterface").to(AuthAdapter);

container.bind<AuthController>(AuthController).toSelf();
container.bind<AuthUseCase>(AuthUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
