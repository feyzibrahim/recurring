export class Employee {
  constructor(
    public _id: string,
    public firstName: string,
    public phoneNumber: number,
    public email: string,
    public username: string,
    public organization: string,
    public isActive: boolean,
    public lastName?: string,
    public hiringDate?: Date,
    public salary?: number,
    public role?: string,
    public profileImageURL?: string,
    public employeeType?: string,
    public gender?: string,
    public address?: {
      city?: string;
      country?: string;
      state?: string;
      street?: string;
      zipCode?: string;
    },
    public designation?: string,
    public terminationReason?: string
  ) {}
}
