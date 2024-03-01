import { injectable } from "inversify";
import { Deal } from "../../../../Entities/Deal";
import { createDeal } from "./functions/createDeal.adapter";
import { getDeal } from "./functions/getDeal.adapter";
import { DealAdapterInterface } from "../../../../interface/deal/DealAdapterInterface";
import { getDeals } from "./functions/getDeals.adapter";
import { updateDeal } from "./functions/updateDeal.adapter";

@injectable()
export class DealAdapter implements DealAdapterInterface {
  async getDeal(slug: string): Promise<boolean | Deal> {
    return getDeal(slug);
  }

  async getDeals(organizationId: string): Promise<boolean | Deal[]> {
    return getDeals(organizationId);
  }

  async createDeal(deal: Deal): Promise<boolean | Deal> {
    return createDeal(deal);
  }

  async updateDeal(deal: Deal): Promise<boolean | Deal> {
    return updateDeal(deal);
  }
}
