import { Client } from "../../../../../Entities/Client";
import ClientModal from "../../Modal/ClientModel";

export const createClient = async (client: Client) => {
  try {
    const newClient = await ClientModal.create(client);
    return newClient;
  } catch (error) {
    console.log("ClientAdapter: createClient -> error", error);
    return false;
  }
};
