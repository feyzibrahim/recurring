import { Client } from "../../../../../Entities/Client";
import ClientModal from "../../Modal/ClientModel";

export const getClients = async (organizationId: string) => {
  try {
    const project = await ClientModal.find({ organization: organizationId });
    return project as Client[];
  } catch (error) {
    console.log("ClientAdapter: getClients -> error", error);
    return false;
  }
};
