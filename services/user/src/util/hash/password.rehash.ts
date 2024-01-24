import bcrypt from "bcrypt";
import { User } from "../../Entities/User";

const reHashPassword = async (user: any, loggedUser: User) => {
  let match: boolean = await bcrypt.compare(user.password, loggedUser.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return loggedUser;
};

export default reHashPassword;
