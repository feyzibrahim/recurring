export class Client {
  constructor(
    public _id: string,
    public email: string,
    public type: "individual" | "company",
    public phone: string,
    public organization: string,
    public slug: string,
    public address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    },
    public createdAt: Date,
    public updatedAt: Date,
    public individualDetails?: {
      firstName: string;
      lastName: string;
    },
    public industry?: string,
    public companyDetails?: {
      companyName: string;
      contactPerson: string;
    },
    public profileImageURL?: string
  ) {}
}
