import { User } from "../../Entities/User";
import { createVerificationLink } from "../JWT/emailVerification.jwt";
import { forgotPasswordResetLink } from "./mailFunction";

export const sendPasswordForgetLink = async (user: User) => {
  const token = createVerificationLink(user);
  const url = "https://recurring.site";
  const link = `${url}/forgot-password/${token}`;

  await forgotPasswordResetLink(user.email, link);
};
