import { inject, injectable } from "inversify";
import { User } from "../Entities/User";
import { UserInterface } from "../interface/UserInterface";

@injectable()
export class UserUseCase {
  constructor(@inject("UserInterface") private userInterface: UserInterface) {}

  getUsers(): Promise<User[]> {
    return this.userInterface.getUsers();
  }
  createUser(userData: User): Promise<User> {
    return this.userInterface.createUser(userData);
  }

  deleteAllUser(): Promise<boolean> {
    return this.userInterface.deleteAllUser();
  }

  fetchUserWithEmail(email: string): Promise<User | boolean> {
    return this.userInterface.fetchUserWithEmail(email);
  }
}
