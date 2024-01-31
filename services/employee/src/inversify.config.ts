import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { EmployeeUseCase } from "./useCases/EmployeeUseCase";
import { EmployeeAdapter } from "./adapter/Database/MongoDB/EmployeeAdapter";
import { EmployeeAdapterInterface } from "./interface/employee/EmployeeAdapterInterface";
import { TYPES } from "./constants/types/types";
import { EmployeeUseCaseInterface } from "./interface/employee/EmployeeUseCaseInterface";
import { EmployeeController } from "./handler/controller/project/EmployeeController";

// Database connection
connectToDatabase();

const container = new Container();

// Employee Injection
container
  .bind<EmployeeAdapterInterface>(TYPES.EmployeeAdapterInterface)
  .to(EmployeeAdapter);
container
  .bind<EmployeeUseCaseInterface>(TYPES.EmployeeUseCaseInterface)
  .to(EmployeeUseCase);
container.bind<EmployeeController>(EmployeeController).toSelf();
container.bind<EmployeeUseCase>(EmployeeUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
