import { Organization } from "../../Entities/Organization";

export interface OrganizationAdapterInterface {
  getOrganization(id: string): Promise<Organization | boolean>;
  createOrganization(
    organization: Organization
  ): Promise<Organization | boolean>;
}
