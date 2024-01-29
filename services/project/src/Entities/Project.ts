export class Project {
  constructor(
    public name: string,
    public startDate: Date,
    public organization: string,
    public tasks: string[],
    public endDate: Date,
    public members: string[],
    public status: "planning" | "active" | "completed" | "archive" | "backlog",
    public description?: string,
    public manager?: string,
    public client?: string,
    public deal?: string
  ) {}
}
