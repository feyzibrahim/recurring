export class User {
  constructor(
    public _id: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public phoneNumber: number,
    public dateOfBirth: Date,
    public role: string,
    public isActive: boolean,
    public profileImageURL: string,
    public isEmailVerified: boolean,
    public organization: string,
    public slug?: string
  ) {}
}
