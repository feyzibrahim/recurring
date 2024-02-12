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
import { connectRabbitMq } from "./infra/rabbitMQ/rabbitmqConnection";
import { AttendanceAdapterInterface } from "./interface/attendance/AttendanceAdapterInterface";
import { AttendanceAdapter } from "./adapter/Database/MongoDB/AttendanceAdapter";
import { AttendanceUseCaseInterface } from "./interface/attendance/AttendanceUseCaseInterface";
import { AttendanceUseCase } from "./useCases/AttendanceUseCase";
import { AttendanceController } from "./handler/controller/attendance/AttendanceController";
import { SalaryAdapterInterface } from "./interface/salary/SalaryAdapterInterface";
import { SalaryAdapter } from "./adapter/Database/MongoDB/SalaryAdapter";
import { SalaryUseCaseInterface } from "./interface/salary/SalaryUseCaseInterface";
import { SalaryUseCase } from "./useCases/SalaryUseCase";
import { SalaryController } from "./handler/controller/salary/SalaryController";

// Database connection
connectToDatabase();

// Message Broker Connection | RabbitMQ
connectRabbitMq();

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

// Attendance Injection
container
  .bind<AttendanceAdapterInterface>(TYPES.AttendanceAdapterInterface)
  .to(AttendanceAdapter);
container
  .bind<AttendanceUseCaseInterface>(TYPES.AttendanceUseCaseInterface)
  .to(AttendanceUseCase);
container.bind<AttendanceController>(AttendanceController).toSelf();
container.bind<AttendanceUseCase>(AttendanceUseCase).toSelf();

// Salary Injection
container
  .bind<SalaryAdapterInterface>(TYPES.SalaryAdapterInterface)
  .to(SalaryAdapter);
container
  .bind<SalaryUseCaseInterface>(TYPES.SalaryUseCaseInterface)
  .to(SalaryUseCase);
container.bind<SalaryController>(SalaryController).toSelf();
container.bind<SalaryUseCase>(SalaryUseCase).toSelf();

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
