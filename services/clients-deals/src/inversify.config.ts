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
import { DealAdapterInterface } from "./interface/deal/DealAdapterInterface";
import { DealAdapter } from "./adapter/Database/MongoDB/DealAdapter";
import { DealUseCaseInterface } from "./interface/deal/DealUseCaseInterface";
import { DealUseCase } from "./useCases/DealUseCase";
import { DealController } from "./handler/controller/deal/DealController";

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

// Deal Injection
container
  .bind<DealAdapterInterface>(TYPES.DealAdapterInterface)
  .to(DealAdapter);
container
  .bind<DealUseCaseInterface>(TYPES.DealUseCaseInterface)
  .to(DealUseCase);
container.bind<DealController>(DealController).toSelf();
container.bind<DealUseCase>(DealUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
