import { Replay } from "./Replay";
import { User } from "./User";

export class Note {
  constructor(
    public text: string,
    public user: string | User,
    public replay: [Replay],
    public _id: string
  ) {}
}
