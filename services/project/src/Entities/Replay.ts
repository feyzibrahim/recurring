import { User } from "./User";

export class Replay {
  constructor(public text: string, public user: string | User) {}
}
