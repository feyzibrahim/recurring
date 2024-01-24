import validator from "validator";
import { User } from "../../Entities/User";
import { AuthUseCase } from "../../useCases/AuthUseCase";
import reHashPassword from "../hash/password.rehash";

const validateUserOnLogin = async (
  user: any,
  authUseCase: AuthUseCase
): Promise<User> => {
  if (user.username.trim() === "" || user.password.trim() === "") {
    throw Error("All fields are required");
  }
  let loggedUser: User | boolean;
  if (validator.isEmail(user.username)) {
    loggedUser = await authUseCase.fetchUserWithEmail(user.username);
  } else {
    loggedUser = await authUseCase.fetchUserWithUsername(user.username);
  }

  if (!loggedUser) {
    throw new Error("User is not Registered");
  }

  let newUser: User = await reHashPassword(user, loggedUser as User);

  return newUser;
};

export default validateUserOnLogin;
