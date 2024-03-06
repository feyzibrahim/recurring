"use client";
import { getSubscriptions } from "@/app/lib/features/subscription/subscriptionActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import EmptyFolder from "@/components/empty/EmptyFolder";
import { useEffect } from "react";
import { columns } from "./subscriptionColumns";
import { ScrollArea } from "@/components/ui/scroll-area";

const SubscriptionList = () => {
  const dispatch = useAppDispatch();
  const { subscriptions } = useAppSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  return (
    <ScrollArea className="w-full h-screen pt-5">
      {subscriptions && subscriptions.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={subscriptions}
          pageTitle="Subscriptions"
          searchField="name"
          //   rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <EmptyFolder />
          <p className="mt-2">No subscriptions are created yet!</p>
        </div>
      )}
    </ScrollArea>
  );
};

export default SubscriptionList;
