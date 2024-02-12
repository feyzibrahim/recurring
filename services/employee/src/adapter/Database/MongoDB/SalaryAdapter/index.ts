import { injectable } from "inversify";
import { Salary } from "../../../../Entities/Salary";
import { createSalary } from "./functions/createSalary.adapter";
import { SalaryAdapterInterface } from "../../../../interface/salary/SalaryAdapterInterface";
import { getSalaryByUserId } from "./functions/getSalaryByUserId.adapter";
import { SimpleFilter } from "../../../../constants/props/SimpleFilter";
import { checkExistingDate } from "./functions/checkExistingDate.adapter";

@injectable()
export class SalaryAdapter implements SalaryAdapterInterface {
  async getSalaryList(id: string): Promise<boolean | Salary> {
    throw new Error("Method not implemented.");
  }

  async createSalary(Salary: Salary): Promise<boolean | Salary> {
    return createSalary(Salary);
  }

  async getSalaryByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<boolean | Salary[]> {
    return getSalaryByUserId(userId, filter);
  }
  async updateSalary(id: string, salary: Salary): Promise<boolean | Salary> {
    throw new Error("Method not implemented.");
  }

  async checkExistingDate(salary: Salary): Promise<boolean | Salary> {
    return checkExistingDate(salary);
  }
}
