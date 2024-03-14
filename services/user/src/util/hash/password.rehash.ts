import bcrypt from "bcrypt";
import { User } from "../../Entities/User";

const reHashPassword = async (user: any, loggedUser: User) => {
  if (!loggedUser.password) {
    throw Error(
      "Email is not verified yet. Check you email for verification Link. If not found go to forget password session"
    );
  }

  let match: boolean = await bcrypt.compare(user.password, loggedUser.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return loggedUser;
};

export default reHashPassword;
