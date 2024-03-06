import { injectable } from "inversify";
import { OrganizationAdapterInterface } from "../../../../interface/organization/OrganizationAdapterInterface";
import { Organization } from "../../../../Entities/Organization";
import { createOrganization } from "./functions/createOrganization.adapter";
import { getOrganization } from "./functions/getOrganization.adapter";
import { getOrganizationByUserId } from "./functions/getOrganizationByUserId.adapter";
import { updateOrganization } from "./functions/updateOrganization.adapter";
import { getOrganizationForAdmin } from "./functions/getOrganizationForAdmin.adapter";

@injectable()
export class OrganizationAdapter implements OrganizationAdapterInterface {
  async getOrganization(id: string): Promise<boolean | Organization> {
    return getOrganization(id);
  }

  async getOrganizationByUserId(id: string): Promise<boolean | Organization> {
    return getOrganizationByUserId(id);
  }

  async createOrganization(
    organization: Organization
  ): Promise<boolean | Organization> {
    return createOrganization(organization);
  }

  async updateOrganization(
    id: string,
    organization: Organization
  ): Promise<boolean | Organization> {
    return updateOrganization(id, organization);
  }

  async getOrganizationForAdmin(): Promise<boolean | Organization[]> {
    return getOrganizationForAdmin();
  }
}
