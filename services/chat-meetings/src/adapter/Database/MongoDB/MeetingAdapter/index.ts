import { injectable } from "inversify";
import { Meeting } from "../../../../Entities/Meeting";
import { createMeeting } from "./functions/createMeeting.adapter";
import { MeetingAdapterInterface } from "../../../../interface/meeting/MeetingAdapterInterface";
import { getMeetings } from "./functions/getMeetings.adapter";
import { updateMeeting } from "./functions/updateMeeting.adapter";
import { getMeetingWithUserId } from "./functions/getMeetingWithUserId";
import { getMeeting } from "./functions/getMeeting.adapter";

@injectable()
export class MeetingAdapter implements MeetingAdapterInterface {
  getMeetings(organizationId: string): Promise<boolean | Meeting[]> {
    return getMeetings(organizationId);
  }
  getMeeting(slug: string): Promise<boolean | Meeting> {
    return getMeeting(slug);
  }

  async getMeetingsWithUserId(userId: string): Promise<boolean | Meeting[]> {
    return getMeetingWithUserId(userId);
  }

  async createMeeting(Meeting: Meeting): Promise<boolean | Meeting> {
    return createMeeting(Meeting);
  }

  async updateMeeting(meeting: Meeting): Promise<boolean | Meeting> {
    return updateMeeting(meeting);
  }
}
