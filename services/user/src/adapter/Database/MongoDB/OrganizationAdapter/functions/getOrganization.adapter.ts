import { Organization } from "../../../../../Entities/Organization";
import OrganizationModal from "../../Modal/OrganizationModal";

export const getOrganization = async (id: string) => {
  try {
    const org = await OrganizationModal.findOne({ _id: id });
    return org as Organization;
  } catch (error) {
    console.log("OrganizationAdapter: getOrganization -> error", error);
    return false;
  }
};
