export class Subscription {
  constructor(
    public organization: string,
    public user: string,
    public subscriptionId: string,
    public customerId: string,
    public planId?: string,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public active?: boolean,
    public subscriptionType?: string
  ) {}
}
