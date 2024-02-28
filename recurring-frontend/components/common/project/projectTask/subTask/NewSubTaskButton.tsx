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
import SubTaskForm from "./SubTaskForm";
import { usePathname } from "next/navigation";

const NewSubTaskButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const path = usePathname();
  const curr = path.split("/")[1];

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
        disabled={curr === "home"}
      >
        New
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Sub Task</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the add button
            </DialogDescription>
          </DialogHeader>
          <SubTaskForm setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewSubTaskButton;
