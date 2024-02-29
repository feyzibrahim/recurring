import { injectable } from "inversify";
import { Client } from "../../../../Entities/Client";
import { createClient } from "./functions/createClient.adapter";
import { getClient } from "./functions/getClient.adapter";
import { ClientAdapterInterface } from "../../../../interface/client/ClientAdapterInterface";
import { getClients } from "./functions/getClients.adapter";
import { updateClient } from "./functions/updateClient.adapter";

@injectable()
export class ClientAdapter implements ClientAdapterInterface {
  async getClient(slug: string): Promise<boolean | Client> {
    return getClient(slug);
  }
  async getClients(organizationId: string): Promise<boolean | Client[]> {
    return getClients(organizationId);
  }

  async createClient(Client: Client): Promise<boolean | Client> {
    return createClient(Client);
  }

  async updateClient(client: Client): Promise<boolean | Client> {
    return updateClient(client);
  }
}
