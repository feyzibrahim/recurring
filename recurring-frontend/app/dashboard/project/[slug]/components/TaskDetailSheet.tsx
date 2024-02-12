"use client";
import React from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { format } from "date-fns";
import { useAppSelector } from "@/app/lib/hook";
import TaskEditForm from "./TaskEditForm";

interface PropsTypes {
  onOpenChange: any;
  setOnOpenChange: any;
}

const TaskDetailSheet = ({ onOpenChange, setOnOpenChange }: PropsTypes) => {
  const { task } = useAppSelector((state) => state.task);
  return (
    <Sheet open={onOpenChange} onOpenChange={setOnOpenChange}>
      <SheetContent>
        {task && <TaskEditForm setIsModalOpen={setOnOpenChange} />}
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
