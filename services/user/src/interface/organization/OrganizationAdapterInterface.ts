import { Organization } from "../../Entities/Organization";

export interface OrganizationAdapterInterface {
  getOrganization(id: string): Promise<Organization | boolean>;
  getOrganizationByUserId(id: string): Promise<Organization | boolean>;
  createOrganization(
    organization: Organization
  ): Promise<Organization | boolean>;
  updateOrganization(
    id: string,
    organization: Organization
  ): Promise<Organization | boolean>;
  getOrganizationForAdmin(): Promise<Organization[] | boolean>;
}
