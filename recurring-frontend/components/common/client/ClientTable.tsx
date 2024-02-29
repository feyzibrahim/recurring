"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmptyEmployee from "@/components/empty/EmptyEmployee";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./clientColumns";
import { getClients } from "@/app/lib/features/client/clientActions";

const ClientTable = () => {
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  return (
    <div>
      {clients && clients.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={clients}
          pageTitle="Client"
          newButton={
            <Link href="clients/create">
              <Button>Add Client</Button>
            </Link>
          }
          searchField="email"
          //   rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <EmptyEmployee />
          <p className="mt-2">No Clients where created</p>
          <p className="text-sm py-2">Please Create One</p>
          <Link href="clients/create">
            <Button>Create Client</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientTable;
