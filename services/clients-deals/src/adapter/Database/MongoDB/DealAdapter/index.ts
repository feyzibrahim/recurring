import { injectable } from "inversify";
import { Deal } from "../../../../Entities/Deal";
import { createDeal } from "./functions/createDeal.adapter";
import { getDeal } from "./functions/getDeal.adapter";
import { DealAdapterInterface } from "../../../../interface/deal/DealAdapterInterface";
import { getDeals } from "./functions/getDeals.adapter";
import { updateDeal } from "./functions/updateDeal.adapter";
import { addActivity } from "./functions/addActivity.adapter";
import { Activity } from "../../../../Entities/Activity";
import { editActivity } from "./functions/editActivity.adapter";
import { addNote } from "./functions/addNote.adapter";
import { editNote } from "./functions/editNote.adapter";
import { Note } from "../../../../Entities/Note";

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

  async addActivity(slug: string, activity: Activity): Promise<boolean | Deal> {
    return addActivity(slug, activity);
  }
  async editActivity(
    slug: string,
    activity: Activity
  ): Promise<boolean | Deal> {
    return editActivity(slug, activity);
  }

  async addNote(slug: string, note: Note): Promise<boolean | Deal> {
    return addNote(slug, note);
  }

  async editNote(slug: string, note: Note): Promise<boolean | Deal> {
    return editNote(slug, note);
  }
}
