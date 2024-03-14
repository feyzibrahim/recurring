import { Request, Response } from "express";
import { SalaryUseCaseInterface } from "../../../../interface/salary/SalaryUseCaseInterface";
import { Salary } from "../../../../Entities/Salary";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const updateSalary = async (
  req: Request,
  res: Response,
  iSalaryUseCase: SalaryUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    const salary = req.body as Salary;

    let sal = await iSalaryUseCase.updateSalary(data.user, salary);
    if (!sal) {
      throw Error("No salary found");
    }

    return res.status(200).json({
      salary: sal,
      success: true,
      message: "Salary successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
