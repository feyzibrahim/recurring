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
import ActivityEditForm from "./ActivityEditForm";
import { FiEdit } from "react-icons/fi";
import { ActivityTypes } from "@/constants/Types";

interface Props {
  slug: string;
  activity: ActivityTypes;
}

const ActivityEditButton = ({ slug, activity }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        className="absolute top-2 right-2"
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
      >
        <FiEdit />
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <ActivityEditForm
            setIsModalOpen={setIsModalOpen}
            slug={slug}
            activity={activity}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivityEditButton;
