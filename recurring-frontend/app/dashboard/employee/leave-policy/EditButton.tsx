"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LeavePolicyEditForm from "./LeavePolicyEditForm";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const EditButton = ({ organization }: { organization: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edit Leave Policy</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Leave Policy</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <LeavePolicyEditForm
            organization={organization}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
