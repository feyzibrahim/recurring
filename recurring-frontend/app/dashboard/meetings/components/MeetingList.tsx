"use client";
import { getMeetings } from "@/app/lib/features/meeting/meetingActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import EmptyNotification from "@/components/empty/EmptyNotification";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./meetingColumns";
import SubscriptionAlertButton from "@/components/common/SubscriptionAlertButton";
import { OrganizationTypes } from "@/constants/Types";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const MeetingList = () => {
  const dispatch = useAppDispatch();
  const { meetings } = useAppSelector((state) => state.meeting);
  const [organization, setOrganization] = useState<OrganizationTypes>();

  useEffect(() => {
    dispatch(getMeetings({ filter: "" }));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      const data = await actualCommonRequest({
        route: API_ROUTES.AUTH,
        method: "GET",
        url: "/api/user/organization",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.success) {
        setOrganization(data.organization);
      }
    };
    loadData();
  }, []);

  return (
    <div className="pt-5">
      {meetings && organization && meetings.length > 0 ? (
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
