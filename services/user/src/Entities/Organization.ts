export class Organization {
  constructor(
    public _id: string,
    public admin: string,
    public name: string,
    public description: string,
    public members: {}[],
    public departments: string[],
    public website: string,
    public address: {
      city: string;
      country: string;
      state: string;
      street: string;
      zipCode: string;
    },
    public industry: string,
    public projects: string[],
    public isActive: boolean,
    public subscriptionId?: string,
    public subscriptionType?: string,
    public subscriptionStripeId?: string,
    public subscriptionActive?: string,
    public slug?: string
  ) {}
}
