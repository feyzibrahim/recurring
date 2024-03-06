"use client";
import { getOrganizations } from "@/app/lib/features/organization/organizationActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import EmptyFolder from "@/components/empty/EmptyFolder";
import { useEffect } from "react";
import { columns } from "./organizationColumns";
import { ScrollArea } from "@/components/ui/scroll-area";

const OrganizationList = () => {
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organization);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  return (
    <ScrollArea className="w-full h-screen pt-5">
      {organizations && organizations.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={organizations}
          pageTitle="Organizations"
          searchField="name"
          //   rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <EmptyFolder />
          <p className="mt-2">No organizations are created yet!</p>
        </div>
      )}
    </ScrollArea>
  );
};

export default OrganizationList;
