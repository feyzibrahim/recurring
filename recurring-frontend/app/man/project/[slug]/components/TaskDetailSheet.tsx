"use client";
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import TaskEditForm from "./TaskEditForm";
import { removeTaskOnClose } from "@/app/lib/features/task/taskSlice";

interface PropsTypes {
  onOpenChange: any;
  setOnOpenChange: any;
}

const TaskDetailSheet = ({ onOpenChange, setOnOpenChange }: PropsTypes) => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);

  return (
    <Sheet
      open={onOpenChange}
      onOpenChange={(data) => {
        dispatch(removeTaskOnClose());
        setOnOpenChange(data);
      }}
    >
      <SheetContent>
        {task && <TaskEditForm setIsModalOpen={setOnOpenChange} />}
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
