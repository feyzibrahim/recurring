import { Request, Response } from "express";
import { SalaryUseCaseInterface } from "../../../../interface/salary/SalaryUseCaseInterface";
import { Salary } from "../../../../Entities/Salary";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createSalary = async (
  req: Request,
  res: Response,
  iSalaryUseCase: SalaryUseCaseInterface
) => {
  try {
    let body = req.body as Salary;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    let salary = await iSalaryUseCase.getSalaryByUserId(data.user, {});
    if (salary) {
      throw Error("Salary Already Exists");
    }

    // body.admin = data.user;

    let sal = (await iSalaryUseCase.createSalary(body)) as Salary;

    return res.status(200).json({
      salary: sal,
      success: true,
      message: "Salary successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
