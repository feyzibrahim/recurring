import { Employee } from "../../Entities/Employee";

export interface EmployeeUseCaseInterface {
  getEmployee(id: string): Promise<Employee | boolean>;
  getEmployees(organizationId: string): Promise<Employee[] | boolean>;
  getEmployeeByUserId(userId: string): Promise<Employee | boolean>;
  createEmployee(employee: Employee): Promise<Employee | boolean>;
  updateEmployee(id: string, employee: Employee): Promise<Employee | boolean>;
  deleteEmployee(id: string): Promise<Employee | boolean>;
  getEmployeesWithRole(
    organizationId: string,
    role: string
  ): Promise<Employee[] | boolean>;
}
