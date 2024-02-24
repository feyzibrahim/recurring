"use client";
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import TaskEditForm from "./TaskEditForm";
import { removeTaskOnClose } from "@/app/lib/features/task/taskSlice";
import { columns } from "./subTaskColumns";
import { TanStackDataTableSmall } from "@/components/custom/TanStackDataTableSmall";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewSubTaskButton from "./NewSubTaskButton";

interface PropsTypes {
  onOpenChange: any;
  setOnOpenChange: any;
}

const TaskDetailSheet = ({ onOpenChange, setOnOpenChange }: PropsTypes) => {
  const dispatch = useAppDispatch();
  const { task } = useAppSelector((state) => state.task);

  const rowOnClick = (value: string) => {
    console.log(value);
  };

  return (
    <Sheet
      open={onOpenChange}
      onOpenChange={(data) => {
        dispatch(removeTaskOnClose());
        setOnOpenChange(data);
      }}
    >
      <SheetContent className="pt-5 px-0">
        <ScrollArea className="h-screen  p-5">
          {task && <TaskEditForm setIsModalOpen={setOnOpenChange} />}
          <div className="pt-3">
            {task && (
              <TanStackDataTableSmall
                columns={columns}
                data={task.subTasks}
                pageTitle="Sub Tasks"
                newButton={<NewSubTaskButton />}
                rowOnCLick={rowOnClick}
              />
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
