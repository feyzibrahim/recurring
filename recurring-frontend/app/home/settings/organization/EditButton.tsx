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
import { ScrollArea } from "@/components/ui/scroll-area";

const EditButton = ({ organization }: { organization: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Edit Organization Details
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] h-[500px] ">
          <DialogHeader>
            <DialogTitle>Edit Organization Details</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <ScrollArea>
            <OrganizationUpdateForm
              organization={organization}
              setIsModalOpen={setIsModalOpen}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
