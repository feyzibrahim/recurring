import { Organization } from "../../../../../Entities/Organization";
import OrganizationModal from "../../Modal/OrganizationModal";

export const createOrganization = async (organization: Organization) => {
  try {
    const org = await OrganizationModal.create(organization);
    return org;
  } catch (error) {
    console.log("OrganizationAdapter: createOrganization -> error", error);
    return false;
  }
};
