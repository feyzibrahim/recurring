"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import DealCreateForm from "./DealCreateForm";

const CreateDealButton = ({
  slug,
  customButton,
}: {
  slug?: string;
  customButton?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!customButton ? (
        <Button onClick={() => setIsModalOpen(true)}>New Deal</Button>
      ) : (
        <div
          className="flex items-center gap-3 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlinePlus />
          New Deal
        </div>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>New Deal</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <DealCreateForm setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDealButton;
