import { Organization } from "../../../../../Entities/Organization";
import OrganizationModal from "../../Modal/OrganizationModal";

export const updateOrganization = async (
  id: string,
  organization: Organization
) => {
  try {
    const org = await OrganizationModal.findOneAndUpdate(
      { _id: id },
      { $set: organization }
    );
    return org as Organization;
  } catch (error) {
    console.log("OrganizationAdapter: updateOrganization -> error", error);
    return false;
  }
};
