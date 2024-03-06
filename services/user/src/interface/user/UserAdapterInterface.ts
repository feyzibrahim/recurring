import { User } from "../../Entities/User";

export interface UserAdapterInterface {
  getUser(id: string): Promise<User | boolean>;
  changePassword(id: string, password: string): Promise<User | boolean>;
  updateUser(user: User): Promise<User | boolean>;
  createEmployee(employee: User): Promise<User | boolean>;
  getUsersInOrgWithoutMe(
    organizationId: string,
    userId: string
  ): Promise<User[] | boolean>;
  getUsersForAdmin(role: string): Promise<User[] | boolean>;
}
