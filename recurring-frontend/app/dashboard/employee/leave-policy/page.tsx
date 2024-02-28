import InputBox from "@/components/common/InputBox";
import { Label } from "@/components/ui/label";
import { getOrganizationData } from "@/server/getOrganizationData";
import React from "react";
import EditButton from "./EditButton";

const page = async () => {
  const organization = await getOrganizationData();

  return (
    <div className="pt-16 px-5 w-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Leave policy</h1>
      </div>

      <div className="md:w-1/2 mb-5">
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Casual leaves:</p>
          </Label>
          <InputBox data={organization && organization.casualLeave} />
        </div>
        <div className="md:w-1/2">
          <Label>
            <p className="pt-5 pb-2">Sick Leaves:</p>
          </Label>
          <InputBox data={organization && organization.sickLeave} />
        </div>
      </div>
      <EditButton organization={organization} />
    </div>
  );
};

export default page;
