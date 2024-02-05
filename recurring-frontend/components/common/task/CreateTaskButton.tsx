"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import ProfileChangeForm from "./ProfileChangeForm";
import { useState } from "react";
import TaskForm from "./TaskForm";

const CreateTaskButton = ({ slug }: { slug: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>New Task</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the save button
            </DialogDescription>
          </DialogHeader>
          <TaskForm setIsModalOpen={setIsModalOpen} slug={slug} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskButton;
