import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { SubscriptionUseCase } from "./useCases/SubscriptionUseCase";
import { SubscriptionAdapter } from "./adapter/Database/MongoDB/SubscriptionAdapter";
import { SubscriptionAdapterInterface } from "./interface/subscription/SubscriptionAdapterInterface";
import { TYPES } from "./constants/types/types";
import { SubscriptionUseCaseInterface } from "./interface/subscription/SubscriptionUseCaseInterface";
import { SubscriptionController } from "./handler/controller/subscription/SubscriptionController";

// Database connection
connectToDatabase();

const container = new Container();

// Subscription Injection
container
  .bind<SubscriptionAdapterInterface>(TYPES.SubscriptionAdapterInterface)
  .to(SubscriptionAdapter);
container
  .bind<SubscriptionUseCaseInterface>(TYPES.SubscriptionUseCaseInterface)
  .to(SubscriptionUseCase);
container.bind<SubscriptionController>(SubscriptionController).toSelf();
container.bind<SubscriptionUseCase>(SubscriptionUseCase).toSelf();

// Subscription Injection

container.bind<SubscriptionController>(SubscriptionController).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
