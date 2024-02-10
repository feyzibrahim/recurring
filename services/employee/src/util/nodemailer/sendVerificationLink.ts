import { Employee } from "../../Entities/Employee";
import { createVerificationLink } from "../JWT/emailVerification.jwt";
import { sendEmployeeInvitation } from "./mailFunction";

export const sendVerificationLink = async (employee: Employee) => {
  const token = createVerificationLink(employee);
  const url = process.env.FRONTEND_URL || "";
  const link = `${url}/verify-email/${token}`;

  await sendEmployeeInvitation(
    employee.email,
    link,
    `${employee.firstName} ${employee.lastName}`
  );
};
