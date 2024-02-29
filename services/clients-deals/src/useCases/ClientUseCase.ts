import { inject, injectable } from "inversify";
import { ClientUseCaseInterface } from "../interface/client/ClientUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Client } from "../Entities/Client";

@injectable()
export class ClientUseCase implements ClientUseCaseInterface {
  constructor(
    @inject(TYPES.ClientAdapterInterface)
    private iClientUseCase: ClientUseCaseInterface
  ) {}
  getClient(slug: string): Promise<boolean | Client> {
    return this.iClientUseCase.getClient(slug);
  }
  getClients(organizationId: string): Promise<boolean | Client[]> {
    return this.iClientUseCase.getClients(organizationId);
  }
  createClient(client: Client): Promise<boolean | Client> {
    return this.iClientUseCase.createClient(client);
  }
  updateClient(client: Client): Promise<boolean | Client> {
    return this.iClientUseCase.updateClient(client);
  }
}
