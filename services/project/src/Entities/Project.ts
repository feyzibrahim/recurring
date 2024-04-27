import { User } from "./User";

export class Project {
  constructor(
    public _id: string,
    public name: string,
    public slug: string,
    public startDate: Date,
    public organization: string,
    public tasks: string[],
    public endDate: Date,
    public members: string[] | User[],
    public status: "planning" | "active" | "completed" | "archive" | "backlog",
    public description?: string,
    public manager?: string | User,
    public client?: string,
    public deal?: string
  ) {}
}
