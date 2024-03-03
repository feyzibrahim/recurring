import { Activity } from "./Activity";
import { Note } from "./Note";

export class Deal {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public organization: string,
    public amount: number,
    public expectedCloseDate: Date,
    public status:
      | "lead"
      | "qualified"
      | "proposal"
      | "negotiation"
      | "closed"
      | "lost",
    public priority: "low" | "medium" | "high",
    public lastContacted: Date,
    public slug: string,
    public createdBy: string,
    public createdAt: Date,
    public updatedAt: Date,
    public activity: [Activity],
    public note: [Note]
  ) {}
}
