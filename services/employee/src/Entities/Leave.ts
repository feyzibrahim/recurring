export class Leave {
  constructor(
    public _id: string,
    public employeeId: string,
    public startDate: Date,
    public endDate: Date,
    public reason: string,
    public status: string,
    public organization: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
