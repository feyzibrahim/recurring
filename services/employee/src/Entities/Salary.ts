export class Salary {
  constructor(
    public _id: string,
    public employeeId: string,
    public date: Date,
    public salary: number,
    public description: string,
    public bonuses: number,
    public allowances: {
      houseRentAllowance: number;
      medicalAllowance: number;
      travelAllowance: number;
    },
    public deductions: {
      providentFund: number;
      tax: number;
    },
    public netSalary: number
  ) {}
}
