import { Organization } from "../../../../../Entities/Organization";
import OrganizationModal from "../../Modal/OrganizationModal";

export const getOrganizationByUserId = async (id: string) => {
  try {
    const org = await OrganizationModal.findOne({ admin: id });
    return org as Organization;
  } catch (error) {
    console.log("OrganizationAdapter: getOrganizationByUserId -> error", error);
    return false;
  }
};
