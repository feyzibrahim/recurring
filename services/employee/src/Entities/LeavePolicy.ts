export class LeavePolicy {
  constructor(
    public _id: string,
    public organization: string,
    public casualLeave: number,
    public sickLeave: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
