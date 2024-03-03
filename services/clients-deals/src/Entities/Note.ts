export class Note {
  constructor(
    public _id: string,
    public content: string,
    public user: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
