import { Organization } from "../../../../../Entities/Organization";
import OrganizationModal from "../../Modal/OrganizationModal";

export const getOrganizationForAdmin = async () => {
  try {
    const organizationList = await OrganizationModal.find({
      name: { $ne: null },
    }).populate("admin");
    return organizationList as Organization[];
  } catch (error) {
    console.log("OrganizationAdapter: getOrganizationForAdmin -> error", error);
    return false;
  }
};
