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
import ActivityAddForm from "./ActivityAddForm";

const ActivityAddButton = ({
  slug,
  customButton,
}: {
  slug: string;
  customButton?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!customButton ? (
        <Button onClick={() => setIsModalOpen(true)}>Add Activity</Button>
      ) : (
        <div
          className="flex items-center gap-3 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlinePlus />
          Add Activity
        </div>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <ActivityAddForm setIsModalOpen={setIsModalOpen} slug={slug} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivityAddButton;
