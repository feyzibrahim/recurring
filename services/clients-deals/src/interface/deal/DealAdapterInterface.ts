import { Deal } from "../../Entities/Deal";

export interface DealAdapterInterface {
  getDeal(slug: string): Promise<Deal | boolean>;
  getDeals(organizationId: string): Promise<Deal[] | boolean>;
  createDeal(client: Deal): Promise<Deal | boolean>;
  updateDeal(client: Deal): Promise<Deal | boolean>;
}
