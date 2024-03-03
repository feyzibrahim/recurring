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
import NoteEditForm from "./NoteEditForm";
import { FiEdit } from "react-icons/fi";
import { NoteTypes } from "@/constants/Types";

interface Props {
  slug: string;
  note: NoteTypes;
}

const NoteEditButton = ({ slug, note }: Props) => {
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
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <NoteEditForm
            setIsModalOpen={setIsModalOpen}
            slug={slug}
            note={note}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteEditButton;
