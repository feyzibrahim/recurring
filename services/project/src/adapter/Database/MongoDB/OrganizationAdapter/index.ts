import { injectable } from "inversify";
import { OrganizationAdapterInterface } from "../../../../interface/organization/OrganizationAdapterInterface";
import { Organization } from "../../../../Entities/Organization";
import { createOrganization } from "./functions/createOrganization.adapter";
import { getOrganization } from "./functions/getOrganization.adapter";

@injectable()
export class OrganizationAdapter implements OrganizationAdapterInterface {
  async getOrganization(id: string): Promise<boolean | Organization> {
    return getOrganization(id);
  }

  async createOrganization(
    organization: Organization
  ): Promise<boolean | Organization> {
    return createOrganization(organization);
  }
}
