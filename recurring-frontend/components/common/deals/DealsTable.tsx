"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./dealColumns";
import { getDeals } from "@/app/lib/features/deal/dealActions";
import { useRouter } from "next/navigation";
import EmptyData from "@/components/empty/EmptyData";
import CreateDealButton from "./CreateDealButton";

const DealsTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { deals } = useAppSelector((state) => state.deal);

  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);

  const rowOnCLick = (slug: string) => router.push(`deals/${slug}`);

  return (
    <div>
      {deals && deals.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={deals}
          pageTitle="Deals"
          newButton={<CreateDealButton />}
          searchField="title"
          rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <EmptyData />
          <p className="mt-2">No Deals where created</p>
          <p className="text-sm py-2">Please Create One</p>
          <CreateDealButton />
        </div>
      )}
    </div>
  );
};

export default DealsTable;
