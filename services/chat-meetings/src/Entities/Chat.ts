import { User } from "./User";

export class Chat {
  constructor(
    public _id: string,
    public participants: [string | User],
    public groupName: string,
    public organization: string,
    public type: "one_to_one" | "group",
    public createdAt: Date,
    public updatedAt: Date,
    public slug: string,
    public groupDescription?: string,
    public groupProfile?: string
  ) {}
}
