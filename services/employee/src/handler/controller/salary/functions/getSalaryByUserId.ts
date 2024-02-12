import { Request, Response } from "express";
import { SalaryUseCaseInterface } from "../../../../interface/salary/SalaryUseCaseInterface";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";

export const getSalaryByUserId = async (
  req: Request,
  res: Response,
  iSalaryUseCase: SalaryUseCaseInterface
) => {
  try {
    const { userSlug } = req.params;

    const { filter } = simpleQueryFilter(req);

    let salary = await iSalaryUseCase.getSalaryByUserId(userSlug, filter);
    if (!salary) {
      throw Error("No salary found");
    }

    return res.status(200).json({
      salary: salary,
      success: true,
      message: "Salary successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
