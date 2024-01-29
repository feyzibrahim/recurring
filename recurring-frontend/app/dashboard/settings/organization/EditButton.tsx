"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import OrganizationUpdateForm from "./OrganizationUpdateForm";
import { useState } from "react";

const EditButton = ({ organization }: { organization: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Edit Organization Details
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] h-[500px] my-5 overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Organization Details</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <OrganizationUpdateForm
            organization={organization}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
