import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { sendVerificationLink } from "../../../../util/nodemailer/sendVerificationLink";
import { Employee } from "../../../../Entities/Employee";

export const sendEmployeeInvitation = async (
  req: Request,
  res: Response,
  iEmployeeUseCAse: EmployeeUseCaseInterface
) => {
  try {
    const { id } = req.params;

    let employee = await iEmployeeUseCAse.getEmployee(id);
    if (!employee) {
      throw Error("No employee found");
    }

    await sendVerificationLink(employee as Employee);

    return res.status(200).json({
      success: true,
      message: "Email Successfully Sent",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
