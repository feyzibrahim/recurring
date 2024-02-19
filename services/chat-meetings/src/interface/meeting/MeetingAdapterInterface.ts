import { Meeting } from "../../Entities/Meeting";

export interface MeetingAdapterInterface {
  getMeetings(organizationId: string): Promise<Meeting[] | boolean>;
  getMeeting(organizationId: string): Promise<Meeting | boolean>;
  getMeetingsWithUserId(userId: string): Promise<Meeting[] | boolean>;
  createMeeting(meeting: Meeting): Promise<Meeting | boolean>;
  updateMeeting(meeting: Meeting): Promise<Meeting | boolean>;
}
