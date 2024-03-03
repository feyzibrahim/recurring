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
import NoteAddForm from "./NoteAddForm";

const NoteAddButton = ({
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
        <Button onClick={() => setIsModalOpen(true)}>Add Note</Button>
      ) : (
        <div
          className="flex items-center gap-3 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlinePlus />
          Add Note
        </div>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <NoteAddForm setIsModalOpen={setIsModalOpen} slug={slug} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteAddButton;
