import { User } from "./User";

export class Task {
  constructor(
    public _id: string,
    public title: string,
    public slug: string,
    public organization: string | User,
    public project: string,
    public startDate: Date,
    public dueDate: Date,
    public status: "planning" | "active" | "completed" | "archive" | "backlog",
    public priority: string,
    public assignee: string | User,
    public description?: string,
    public tags?: [string],
    public subTasks?: [
      {
        title: string;
        status: "planning" | "active" | "completed" | "archive" | "backlog";
      }
    ],
    public notes?: [string]
  ) {}
}
