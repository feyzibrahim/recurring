import { inject, injectable } from "inversify";
import { EmployeeUseCaseInterface } from "../interface/employee/EmployeeUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Employee } from "../Entities/Employee";

@injectable()
export class EmployeeUseCase implements EmployeeUseCaseInterface {
  constructor(
    @inject(TYPES.EmployeeAdapterInterface)
    private iEmployeeUseCase: EmployeeUseCaseInterface
  ) {}

  getEmployee(id: string): Promise<boolean | Employee> {
    return this.iEmployeeUseCase.getEmployee(id);
  }
  getEmployees(organizationId: string): Promise<boolean | Employee[]> {
    return this.iEmployeeUseCase.getEmployees(organizationId);
  }
  getEmployeeByUserId(userId: string): Promise<boolean | Employee> {
    return this.iEmployeeUseCase.getEmployeeByUserId(userId);
  }
  createEmployee(employee: Employee): Promise<boolean | Employee> {
    return this.iEmployeeUseCase.createEmployee(employee);
  }
  updateEmployee(id: string, employee: Employee): Promise<boolean | Employee> {
    return this.iEmployeeUseCase.updateEmployee(id, employee);
  }
  deleteEmployee(id: string): Promise<boolean | Employee> {
    return this.iEmployeeUseCase.deleteEmployee(id);
  }
}
