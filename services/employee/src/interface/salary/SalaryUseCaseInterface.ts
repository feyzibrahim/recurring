import { Salary } from "../../Entities/Salary";
import { SimpleFilter } from "../../constants/props/SimpleFilter";

export interface SalaryUseCaseInterface {
  getSalaryList(id: string): Promise<Salary | boolean>;
  getSalaryByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<Salary[] | boolean>;
  createSalary(salary: Salary): Promise<Salary | boolean>;
  updateSalary(id: string, salary: Salary): Promise<Salary | boolean>;
  checkExistingDate(salary: Salary): Promise<Salary | boolean>;
}
