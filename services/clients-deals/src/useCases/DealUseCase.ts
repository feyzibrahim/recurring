import { inject, injectable } from "inversify";
import { DealUseCaseInterface } from "../interface/deal/DealUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Deal } from "../Entities/Deal";
import { Activity } from "../Entities/Activity";
import { Note } from "../Entities/Note";

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
  addActivity(slug: string, activity: Activity): Promise<boolean | Deal> {
    return this.iDealUseCase.addActivity(slug, activity);
  }
  editActivity(slug: string, activity: Activity): Promise<boolean | Deal> {
    return this.iDealUseCase.editActivity(slug, activity);
  }
  addNote(slug: string, note: Note): Promise<boolean | Deal> {
    return this.iDealUseCase.addNote(slug, note);
  }
  editNote(slug: string, note: Note): Promise<boolean | Deal> {
    return this.iDealUseCase.editNote(slug, note);
  }
}
