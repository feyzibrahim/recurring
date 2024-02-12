import { inject, injectable } from "inversify";
import { SalaryUseCaseInterface } from "../interface/salary/SalaryUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Salary } from "../Entities/Salary";
import { SimpleFilter } from "../constants/props/SimpleFilter";

@injectable()
export class SalaryUseCase implements SalaryUseCaseInterface {
  constructor(
    @inject(TYPES.SalaryAdapterInterface)
    private iSalaryUseCase: SalaryUseCaseInterface
  ) {}

  getSalaryList(id: string): Promise<boolean | Salary> {
    return this.iSalaryUseCase.getSalaryList(id);
  }

  getSalaryByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<boolean | Salary[]> {
    return this.iSalaryUseCase.getSalaryByUserId(userId, filter);
  }
  createSalary(salary: Salary): Promise<boolean | Salary> {
    return this.iSalaryUseCase.createSalary(salary);
  }
  updateSalary(id: string, salary: Salary): Promise<boolean | Salary> {
    return this.iSalaryUseCase.updateSalary(id, salary);
  }

  checkExistingDate(salary: Salary): Promise<boolean | Salary> {
    return this.iSalaryUseCase.checkExistingDate(salary);
  }
}
