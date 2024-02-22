import { injectable } from "inversify";
import { Employee } from "../../../../Entities/Employee";
import { createEmployee } from "./functions/createEmployee.adapter";
import { getEmployee } from "./functions/getEmployee.adapter";
import { EmployeeAdapterInterface } from "../../../../interface/employee/EmployeeAdapterInterface";
import { getEmployees } from "./functions/getEmployees.adapter";
import { updateEmployee } from "./functions/updateEmployee.adapter";
import { deleteEmployee } from "./functions/deleteEmployee.adapter";
import { getEmployeesWithRole } from "./functions/getEmployeesWithRole.adapter";
import { terminateEmployee } from "./functions/terminateEmployee.adapter";
import { getExEmployees } from "./functions/getExEmployees.adapter";

@injectable()
export class EmployeeAdapter implements EmployeeAdapterInterface {
  async getEmployees(organizationId: string): Promise<boolean | Employee[]> {
    return getEmployees(organizationId);
  }

  async getEmployee(id: string): Promise<boolean | Employee> {
    return getEmployee(id);
  }
  async getExEmployees(id: string): Promise<boolean | Employee[]> {
    return getExEmployees(id);
  }

  async createEmployee(Employee: Employee): Promise<boolean | Employee> {
    return createEmployee(Employee);
  }

  async terminateEmployee(employee: Employee): Promise<boolean | Employee> {
    return terminateEmployee(employee);
  }

  async getEmployeeByUserId(userId: string): Promise<boolean | Employee> {
    throw new Error(
      "EmployeeAdapter -> getEmployeeByUserId -> Method not implemented."
    );
  }
  async updateEmployee(
    id: string,
    employee: Employee
  ): Promise<boolean | Employee> {
    return updateEmployee(employee);
  }

  async deleteEmployee(id: string): Promise<boolean | Employee> {
    return deleteEmployee(id);
  }

  async getEmployeesWithRole(
    organizationId: string,
    role: string
  ): Promise<boolean | Employee[]> {
    return getEmployeesWithRole(organizationId, role);
  }
}
