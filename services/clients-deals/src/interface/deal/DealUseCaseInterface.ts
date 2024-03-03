import { Activity } from "../../Entities/Activity";
import { Deal } from "../../Entities/Deal";
import { Note } from "../../Entities/Note";

export interface DealUseCaseInterface {
  getDeal(slug: string): Promise<Deal | boolean>;
  getDeals(organizationId: string): Promise<Deal[] | boolean>;
  createDeal(deal: Deal): Promise<Deal | boolean>;
  updateDeal(deal: Deal): Promise<Deal | boolean>;
  addActivity(slug: string, activity: Activity): Promise<Deal | boolean>;
  editActivity(slug: string, activity: Activity): Promise<Deal | boolean>;
  addNote(slug: string, note: Note): Promise<Deal | boolean>;
  editNote(slug: string, note: Note): Promise<Deal | boolean>;
}
