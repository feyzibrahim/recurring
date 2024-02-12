import { Request, Response } from "express";
import { SalaryUseCaseInterface } from "../../../../interface/salary/SalaryUseCaseInterface";
import { Salary } from "../../../../Entities/Salary";

export const createSalaryByAdmin = async (
  req: Request,
  res: Response,
  iSalaryUseCase: SalaryUseCaseInterface
) => {
  try {
    let body = req.body as Salary;

    const exists = await iSalaryUseCase.checkExistingDate(body);
    if (exists) {
      throw Error("Already salary added for this date");
    }

    let salary = (await iSalaryUseCase.createSalary(body)) as Salary;

    return res.status(200).json({
      salary: salary,
      success: true,
      message: "Salary successfully Marked",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
