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
import NewNoteForm from "./NewNoteForm";
import { EmployeeTypes } from "@/constants/Types";

const NewNotesButton = ({ user }: { user: EmployeeTypes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
        New
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Comment</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the add button
            </DialogDescription>
          </DialogHeader>
          <NewNoteForm setIsModalOpen={setIsModalOpen} user={user} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewNotesButton;
