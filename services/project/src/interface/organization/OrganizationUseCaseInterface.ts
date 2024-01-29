import { Organization } from "../../Entities/Organization";

export interface OrganizationUseCaseInterface {
  getOrganization(id: string): Promise<Organization | boolean>;
  createOrganization(
    organization: Organization
  ): Promise<Organization | boolean>;
}
