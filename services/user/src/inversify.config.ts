import { Container } from "inversify";
import { UserController } from "./controller/UserController";
import { UserUseCase } from "./useCases/UserUseCase";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";
import { UserAdapter } from "./adapter/Database/MongoDB/UserAdapter";
import { UserInterface } from "./interface/UserInterface";

// Database connection
connectToDatabase();

const container = new Container();

container.bind<UserInterface>("UserInterface").to(UserAdapter);
container.bind<UserController>(UserController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
