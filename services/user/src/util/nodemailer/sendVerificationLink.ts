import { User } from "../../Entities/User";
import { createVerificationLink } from "../JWT/emailVerification.jwt";
import { sendVerificationMail } from "./mailFunction";

export const sendVerificationLink = async (user: User) => {
  const token = createVerificationLink(user);
  const url = "https://recurring.site";
  const link = `${url}/verify-email/${token}`;

  await sendVerificationMail(user.email, link);
};
