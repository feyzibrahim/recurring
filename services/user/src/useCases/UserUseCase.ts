import { inject, injectable } from "inversify";
import { UserUseCaseInterface } from "../interface/user/UserUseCaseInterface";
import { User } from "../Entities/User";
import { TYPES } from "../constants/types/types";

@injectable()
export class UserUseCase implements UserUseCaseInterface {
  constructor(
    @inject(TYPES.UserAdapterInterface)
    private iUserUseCase: UserUseCaseInterface
  ) {}
  getUser(id: string): Promise<boolean | User> {
    return this.iUserUseCase.getUser(id);
  }
}
