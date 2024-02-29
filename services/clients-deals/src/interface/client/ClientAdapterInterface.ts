import { Client } from "../../Entities/Client";

export interface ClientAdapterInterface {
  getClient(slug: string): Promise<Client | boolean>;
  getClients(organizationId: string): Promise<Client[] | boolean>;
  createClient(client: Client): Promise<Client | boolean>;
  updateClient(client: Client): Promise<Client | boolean>;
}
