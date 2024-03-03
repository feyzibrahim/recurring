export class Activity {
  constructor(
    public title: string,
    public description: string,
    public user: string,
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: string
  ) {}
}
