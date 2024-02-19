import { User } from "./User";

export class Meeting {
  constructor(
    public title: string,
    public description: string,
    public type: string,
    public location: string,
    public startTime: Date,
    public endTime: Date,
    public date: Date,
    public slug: string,
    public organizer: string | User,
    public participants: [string | User],
    public organization: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public _id?: string
  ) {}
}
