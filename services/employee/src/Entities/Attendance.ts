export class Attendance {
  constructor(
    public _id: string,
    public employeeId: string,
    public date: Date,
    public checkInTime: Date,
    public checkOutTime: Date,
    public status: string,
    public remarks: string
  ) {}
}
