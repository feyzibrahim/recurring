import { Client } from "../../../../../Entities/Client";
import ClientModal from "../../Modal/ClientModel";

export const updateClient = async (client: Client) => {
  try {
    const newClient = await ClientModal.findOneAndUpdate({ _id: client._id });
    return newClient as Client;
  } catch (error) {
    console.log("ClientAdapter: updateClient -> error", error);
    return false;
  }
};
