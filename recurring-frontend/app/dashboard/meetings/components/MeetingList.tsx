"use client";
import { getMeetings } from "@/app/lib/features/meeting/meetingActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";
import EmptyNotification from "@/components/empty/EmptyNotification";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MeetingTypes } from "@/constants/Types";
import Link from "next/link";
import React, { useEffect } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { FiEdit } from "react-icons/fi";

const MeetingList = () => {
  const dispatch = useAppDispatch();
  const { meetings } = useAppSelector((state) => state.meeting);

  useEffect(() => {
    dispatch(getMeetings({ filter: "" }));
  }, []);

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(minutes));
    return format(time, "h:mm a");
  };

  const isExpired = (timeString: string, dateString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
    const day = date.getDate();

    const time = new Date();
    time.setFullYear(year);
    time.setMonth(month - 1); // Month is 0-indexed in JavaScript Date object
    time.setDate(day);
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(minutes));
    return isAfter(Date.now(), time);
  };

  return (
    <div className="">
      {meetings && meetings.length > 0 ? (
        <div className="px-5 text-sm">
          <table className="w-full border-collapse  bg-backgroundAccent rounded-lg">
            <thead>
              <tr className="text-left">
                <th className="border-t border-background p-3">Title</th>
                <th className="border-t border-background p-3">Organizer</th>
                <th className="border-t border-background p-3">Participants</th>
                <th className="border-t border-background p-3 shrink-0">
                  Date
                </th>
                <th className="border-t border-background p-3">Time</th>
                <th className="border-t border-background p-3">Type</th>
                <th className="border-t border-background p-3">Status</th>
                <th className="border-t border-background p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting: MeetingTypes, index: number) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-secondary"
                    // onClick={() => router.push(`project/${project.slug}`)}
                  >
                    <td className="border-t border-background p-3">
                      <div className="max-w-xs">
                        <p>{meeting.title}</p>
                        <p className="line-clamp-1 text-xs text-foregroundAccent">
                          {meeting.description}
                        </p>
                      </div>
                    </td>
                    <td className="border-t border-background p-3">
                      {typeof meeting.organizer !== "string" && (
                        <div className="flex gap-1 items-center">
                          <Avatar key={index} className={`w-7 h-7 border`}>
                            <AvatarImage
                              src={meeting.organizer.profileImageURL}
                            />
                            <AvatarFallbackImage />
                          </Avatar>
                          <p>
                            {meeting.organizer.firstName}{" "}
                            {meeting.organizer.lastName}
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="border-t border-background p-3">
                      <div className="flex items-center">
                        {meeting.participants &&
                          meeting.participants.map(
                            (member, index) =>
                              typeof member !== "string" && (
                                <Avatar
                                  key={index}
                                  className={`w-7 h-7 border ${
                                    index !== 0 ? "-ml-2" : ""
                                  }`}
                                >
                                  <AvatarImage src={member.profileImageURL} />
                                  <AvatarFallbackImage />
                                </Avatar>
                              )
                          )}
                        {meeting.participants &&
                          meeting.participants.length > 4 && (
                            <div className="relative flex items-center justify-center w-7 h-7 border -ml-2 rounded-full bg-background text-sm">
                              +{meeting.participants.length - 4}
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="border-t border-background p-3 shrink-0">
                      {format(new Date(meeting.date), "MMM d, yyyy")}
                    </td>
                    <td className="border-t border-background p-3">
                      {formatTime(meeting.startTime)} -{" "}
                      {formatTime(meeting.endTime)}
                    </td>
                    <td className="border-t border-background p-3 capitalize">
                      {meeting.type}
                    </td>
                    <td className="border-t border-background p-3 capitalize">
                      {meeting.status || "No status provided"}
                    </td>
                    <td className="border-t border-background p-3 capitalize">
                      {isExpired(meeting.endTime, meeting.date) ? (
                        <p className="text-xs text-foregroundAccent">Expired</p>
                      ) : (
                        <Link href={`meetings/edit/${meeting.slug}`}>
                          <FiEdit className="hover:text-foregroundAccent cursor-pointer" />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <EmptyNotification />
          <p className="mt-2">No Meetings where created yet!</p>
          <p className="text-sm py-2">Please Create One</p>
          <Link href="meetings/create">
            <Button>Create Meeting</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MeetingList;
