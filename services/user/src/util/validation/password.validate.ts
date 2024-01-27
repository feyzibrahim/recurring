import bcrypt from "bcrypt";
import validator from "validator";
import { AuthUseCaseInterface } from "../../interface/auth/AuthUseCaseInterface";

const passwordValidate = async (
  password: string,
  confirmPassword: string,
  authUseCase: AuthUseCaseInterface
) => {
  if (!password || !confirmPassword) {
    throw Error("All fields are necessary");
  }

  if (password !== confirmPassword) {
    throw Error("Password Doesn't match");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }

  let salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(password, salt);

  return hash;
};

export default passwordValidate;
