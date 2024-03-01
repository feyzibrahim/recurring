import { Deal } from "../../Entities/Deal";

export interface DealUseCaseInterface {
  getDeal(slug: string): Promise<Deal | boolean>;
  getDeals(organizationId: string): Promise<Deal[] | boolean>;
  createDeal(client: Deal): Promise<Deal | boolean>;
  updateDeal(client: Deal): Promise<Deal | boolean>;
}
