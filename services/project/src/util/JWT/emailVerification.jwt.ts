import Jwt from "jsonwebtoken";
import { User } from "../../Entities/User";

interface JwtPayload {
  user: string;
  role: string;
}

const createVerificationLink = (user: User): string => {
  const secret = process.env.VERIFICATION_SECRET || "";

  if (!user.email) {
    throw Error("Id is not send");
  }

  return Jwt.sign({ user: user.email }, secret, {
    expiresIn: "1h",
  });
};

const validateVerificationToken = (token: string): JwtPayload => {
  let secret = process.env.VERIFICATION_SECRET ?? "";
  return Jwt.verify(token, secret) as JwtPayload;
};

export { createVerificationLink, validateVerificationToken };
