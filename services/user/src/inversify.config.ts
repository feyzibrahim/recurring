import { Container } from "inversify";
import { AuthController } from "./handler/controller/auth/AuthController";
import { AuthUseCase } from "./useCases/AuthUseCase";
// import { UserController } from "./handler/controller/UserController";
// import { UserUseCase } from "./useCases/UserUseCase";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";
import { UserAdapter } from "./adapter/Database/MongoDB/UserAdapter";
import { UserInterface } from "./interface/UserInterface";
import { AuthInterface } from "./interface/AuthInterface";
import { AuthAdapter } from "./adapter/Database/MongoDB/AuthAdapter";

// Database connection
connectToDatabase();

const container = new Container();

container.bind<UserInterface>("UserInterface").to(UserAdapter);
container.bind<AuthInterface>("AuthInterface").to(AuthAdapter);

// container.bind<UserController>(UserController).toSelf();
// container.bind<UserUseCase>(UserUseCase).toSelf();

container.bind<AuthController>(AuthController).toSelf();
container.bind<AuthUseCase>(AuthUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
