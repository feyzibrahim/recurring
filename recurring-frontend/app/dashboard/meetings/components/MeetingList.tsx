"use client";
import { getMeetings } from "@/app/lib/features/meeting/meetingActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import EmptyNotification from "@/components/empty/EmptyNotification";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./meetingColumns";
import SubscriptionAlertButton from "@/components/common/SubscriptionAlertButton";
import { OrganizationTypes } from "@/constants/Types";

interface Props {
  organization: OrganizationTypes;
}

const MeetingList = ({ organization }: Props) => {
  const dispatch = useAppDispatch();
  const { meetings } = useAppSelector((state) => state.meeting);

  useEffect(() => {
    dispatch(getMeetings({ filter: "" }));
  }, [dispatch]);

  return (
    <div className="pt-5">
      {meetings && meetings.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={meetings}
          pageTitle="Meetings"
          newButton={
            <SubscriptionAlertButton
              organization={organization}
              validationLength={meetings.length}
              subTitle="meeting"
              title="Meeting"
              url="meetings/create"
            />
          }
          searchField="title"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
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
