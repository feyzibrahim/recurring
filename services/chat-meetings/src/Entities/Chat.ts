import { User } from "./User";

export class Chat {
  constructor(
    public _id: string,
    public participants: [string | User],
    public groupName: string,
    public organization: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
