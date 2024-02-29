import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { ClientUseCase } from "./useCases/ClientUseCase";
import { ClientAdapter } from "./adapter/Database/MongoDB/ClientAdapter";
import { ClientAdapterInterface } from "./interface/client/ClientAdapterInterface";
import { TYPES } from "./constants/types/types";
import { ClientUseCaseInterface } from "./interface/client/ClientUseCaseInterface";
import { ClientController } from "./handler/controller/client/ClientController";

// Database connection
connectToDatabase();

const container = new Container();

// Client Injection
container
  .bind<ClientAdapterInterface>(TYPES.ClientAdapterInterface)
  .to(ClientAdapter);
container
  .bind<ClientUseCaseInterface>(TYPES.ClientUseCaseInterface)
  .to(ClientUseCase);
container.bind<ClientController>(ClientController).toSelf();
container.bind<ClientUseCase>(ClientUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
