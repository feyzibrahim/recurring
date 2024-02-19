import { inject, injectable } from "inversify";
import { MeetingUseCaseInterface } from "../interface/meeting/MeetingUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Meeting } from "../Entities/Meeting";

@injectable()
export class MeetingUseCase implements MeetingUseCaseInterface {
  constructor(
    @inject(TYPES.MeetingAdapterInterface)
    private iMeetingUseCase: MeetingUseCaseInterface
  ) {}

  getMeetings(userId: string): Promise<boolean | Meeting[]> {
    return this.iMeetingUseCase.getMeetings(userId);
  }
  getMeeting(slug: string): Promise<boolean | Meeting> {
    return this.iMeetingUseCase.getMeeting(slug);
  }
  createMeeting(meeting: Meeting): Promise<boolean | Meeting> {
    return this.iMeetingUseCase.createMeeting(meeting);
  }
  updateMeeting(meeting: Meeting): Promise<boolean | Meeting> {
    return this.iMeetingUseCase.updateMeeting(meeting);
  }
  getMeetingsWithUserId(userId: string): Promise<boolean | Meeting[]> {
    return this.iMeetingUseCase.getMeetingsWithUserId(userId);
  }
}
