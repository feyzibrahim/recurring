import { inject, injectable } from "inversify";
import { OrganizationUseCaseInterface } from "../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../Entities/Organization";
import { TYPES } from "../constants/types/types";

@injectable()
export class OrganizationUseCase implements OrganizationUseCaseInterface {
  constructor(
    @inject(TYPES.OrganizationAdapterInterface)
    private iOrganizationUseCase: OrganizationUseCaseInterface
  ) {}

  getOrganization(id: string): Promise<boolean | Organization> {
    return this.iOrganizationUseCase.getOrganization(id);
  }

  getOrganizationByUserId(id: string): Promise<boolean | Organization> {
    return this.iOrganizationUseCase.getOrganizationByUserId(id);
  }

  createOrganization(
    organization: Organization
  ): Promise<boolean | Organization> {
    return this.iOrganizationUseCase.createOrganization(organization);
  }

  updateOrganization(
    id: string,
    organization: Organization
  ): Promise<boolean | Organization> {
    return this.iOrganizationUseCase.updateOrganization(id, organization);
  }

  getOrganizationForAdmin(): Promise<boolean | Organization[]> {
    return this.iOrganizationUseCase.getOrganizationForAdmin();
  }
}
