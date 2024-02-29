"use client";
import React, { useContext, useState } from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { TaskContext } from "./TaskContextProvider";
import { format } from "date-fns";
import TaskEditForm from "@/components/common/project/projectTask/task/TaskEditForm";
import { useAppSelector } from "@/app/lib/hook";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TanStackDataTableSmall } from "@/components/custom/TanStackDataTableSmall";
import { columns } from "@/components/common/project/projectTask/subTask/subTaskColumns";
import NewSubTaskButton from "@/components/common/project/projectTask/subTask/NewSubTaskButton";
import NotesListInSheet from "@/components/common/project/projectTask/notes/NotesListInSheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import SubTaskEditForm from "@/components/common/project/projectTask/subTask/SubTaskEditForm";
import { EmployeeTypes } from "@/constants/Types";

const TaskDetailSheet = ({ user }: { user: EmployeeTypes }) => {
  const { onOpenChange, setOnOpenChange } = useContext(TaskContext);
  const { task } = useAppSelector((state) => state.task);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTaskSlug, setSubTaskSlug] = useState("");

  const rowOnClick = (value: string) => {
    setIsModalOpen(true);
    setSubTaskSlug(value);
  };

  return (
    <Sheet open={onOpenChange} onOpenChange={setOnOpenChange}>
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
          <NotesListInSheet user={user} />
        </ScrollArea>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Sub Task</DialogTitle>
              <DialogDescription>
                Update in the below form. After your done click the add button
              </DialogDescription>
            </DialogHeader>
            <SubTaskEditForm
              setIsModalOpen={setIsModalOpen}
              subTaskSlug={subTaskSlug}
            />
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
