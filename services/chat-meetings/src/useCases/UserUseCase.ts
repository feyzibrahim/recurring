import { inject, injectable } from "inversify";
import { UserUseCaseInterface } from "../interface/user/UserUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { User } from "../Entities/User";

@injectable()
export class UserUseCase implements UserUseCaseInterface {
  constructor(
    @inject(TYPES.UserAdapterInterface)
    private iUserUseCase: UserUseCaseInterface
  ) {}

  getUserById(id: string): Promise<boolean | User> {
    return this.iUserUseCase.getUserById(id);
  }
}
