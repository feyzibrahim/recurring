"use client";
import { getMeetings } from "@/app/lib/features/meeting/meetingActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import EmptyNotification from "@/components/empty/EmptyNotification";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./meetingColumns";

const MeetingList = () => {
  const dispatch = useAppDispatch();
  const { meetings } = useAppSelector((state) => state.meeting);

  useEffect(() => {
    dispatch(getMeetings({ filter: "" }));
  }, [dispatch]);

  return (
    <div className="">
      {meetings && meetings.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={meetings}
          pageTitle="Meetings"
          newButton={
            <Link href="meetings/create">
              <Button>New Meeting</Button>
            </Link>
          }
          searchField="title"
        />
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
