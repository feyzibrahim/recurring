import { Organization } from "../../../../../Entities/Organization";
import OrganizationModal from "../../Modal/OrganizationModal";
import UserModal from "../../Modal/UserModal";

export const createOrganization = async (organization: Organization) => {
  try {
    const org = await OrganizationModal.create(organization);

    const user = await UserModal.findOneAndUpdate(
      { _id: organization.admin },
      { $set: { organization: org._id } },
      { new: true }
    );

    return org;
  } catch (error) {
    console.log("OrganizationAdapter: createOrganization -> error", error);
    return false;
  }
};
