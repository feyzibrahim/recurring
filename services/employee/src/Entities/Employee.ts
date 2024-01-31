export class Employee {
  constructor(
    public firstName: string,
    public lastName: Date,
    public phoneNumber: number,
    public email: string,
    public username: Date,
    public hiringDate: Date,
    public organization: string,
    public isActive: boolean,
    public salary?: number,
    public role?: string,
    public profileImageURL?: string,
    public employeeType?: string,
    public gender?: string
  ) {}
}
