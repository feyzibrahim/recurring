import { inject, injectable } from "inversify";
import { DealUseCaseInterface } from "../interface/deal/DealUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Deal } from "../Entities/Deal";

@injectable()
export class DealUseCase implements DealUseCaseInterface {
  constructor(
    @inject(TYPES.DealAdapterInterface)
    private iDealUseCase: DealUseCaseInterface
  ) {}
  getDeal(slug: string): Promise<boolean | Deal> {
    return this.iDealUseCase.getDeal(slug);
  }
  getDeals(organizationId: string): Promise<boolean | Deal[]> {
    return this.iDealUseCase.getDeals(organizationId);
  }
  createDeal(deal: Deal): Promise<boolean | Deal> {
    return this.iDealUseCase.createDeal(deal);
  }
  updateDeal(deal: Deal): Promise<boolean | Deal> {
    return this.iDealUseCase.updateDeal(deal);
  }
}
