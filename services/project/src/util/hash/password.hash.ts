import bcrypt from "bcrypt";
import { User } from "../../Entities/User";

const hashPassword = async (user: User) => {
  let salt: string = await bcrypt.genSalt(10);
  const hash: string = await bcrypt.hash(user.password, salt);

  let newUser: User = user;
  newUser.password = hash;

  return newUser;
};

export default hashPassword;
