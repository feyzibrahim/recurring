import { Client } from "../../../../../Entities/Client";
import ClientModal from "../../Modal/ClientModel";

export const getClient = async (slug: string) => {
  try {
    const project = await ClientModal.findOne({ slug: slug });
    return project as Client;
  } catch (error) {
    console.log("ClientAdapter: getClient -> error", error);
    return false;
  }
};
