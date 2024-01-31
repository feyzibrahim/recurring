import { injectable } from "inversify";
import { Employee } from "../../../../Entities/Employee";
import { createEmployee } from "./functions/createEmployee.adapter";
import { getEmployee } from "./functions/getEmployee.adapter";
import { EmployeeAdapterInterface } from "../../../../interface/employee/EmployeeAdapterInterface";
import { getEmployees } from "./functions/getEmployees.adapter";

@injectable()
export class EmployeeAdapter implements EmployeeAdapterInterface {
  getEmployees(organizationId: string): Promise<boolean | Employee[]> {
    return getEmployees(organizationId);
  }

  async getEmployee(id: string): Promise<boolean | Employee> {
    return getEmployee(id);
  }

  async createEmployee(Employee: Employee): Promise<boolean | Employee> {
    return createEmployee(Employee);
  }

  async getEmployeeByUserId(userId: string): Promise<boolean | Employee> {
    throw new Error(
      "EmployeeAdapter -> getEmployeeByUserId -> Method not implemented."
    );
  }
  async updateEmployee(
    id: string,
    project: Employee
  ): Promise<boolean | Employee> {
    throw new Error(
      "EmployeeAdapter -> updateEmployee -> Method not implemented."
    );
  }
}
