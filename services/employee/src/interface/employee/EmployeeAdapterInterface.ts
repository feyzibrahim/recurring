import { Employee } from "../../Entities/Employee";

export interface EmployeeAdapterInterface {
  getEmployee(id: string): Promise<Employee | boolean>;
  getEmployees(organizationId: string): Promise<Employee[] | boolean>;
  getExEmployees(organizationId: string): Promise<Employee[] | boolean>;
  getEmployeeByUserId(userId: string): Promise<Employee | boolean>;
  createEmployee(employee: Employee): Promise<Employee | boolean>;
  updateEmployee(id: string, employee: Employee): Promise<Employee | boolean>;
  terminateEmployee(employee: Employee): Promise<Employee | boolean>;
  deleteEmployee(id: string): Promise<Employee | boolean>;
  getEmployeesWithRole(
    organizationId: string,
    role: string
  ): Promise<Employee[] | boolean>;
}
