import validator from "validator";
import { User } from "../../Entities/User";
import reHashPassword from "../hash/password.rehash";
import { AuthUseCaseInterface } from "../../interface/auth/AuthUseCaseInterface";

const validateUserOnLogin = async (
  user: any,
  authUseCase: AuthUseCaseInterface
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
