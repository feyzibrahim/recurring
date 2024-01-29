import validator from "validator";
import { User } from "../../Entities/User";
import { AuthUseCaseInterface } from "../../interface/auth/AuthUseCaseInterface";

const validateUser = async (
  user: any,
  iAuthUseCase: AuthUseCaseInterface
): Promise<User> => {
  if (
    // user.firstName.trim() === "" ||
    user.username.trim() === "" ||
    user.email.trim() === ""
    // user.role.trim() === ""
  ) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(user.email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(user.password)) {
    throw Error("Password is not Strong");
  }

  if (user.password !== user.confirmPassword) {
    throw Error("Password Doesn't Match");
  }

  // Deleting it after validating
  delete user.confirmPassword;

  // Checking if user already exists
  const emailExists = await iAuthUseCase.fetchUserWithEmail(user.email);
  if (emailExists) {
    throw new Error("Email Already already Exists");
  }

  const username = await iAuthUseCase.fetchUserWithUsername(user.username);
  if (username) {
    throw new Error("Username already Exists");
  }

  return user as User;
};

export default validateUser;
