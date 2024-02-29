import BackButton from "@/components/common/BackButton";
import ClientCreateForm from "@/components/common/client/ClientCreateForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const page = () => {
  return (
    <ScrollArea className="w-full">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Create Client</h1>
        <BackButton />
      </div>
      <ClientCreateForm />
    </ScrollArea>
  );
};

export default page;
