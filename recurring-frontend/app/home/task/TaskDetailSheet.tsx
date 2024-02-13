"use client";
import React, { useContext } from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { TaskContext } from "./TaskContextProvider";
import { format } from "date-fns";

const TaskDetailSheet = () => {
  const { onOpenChange, setOnOpenChange, sheetData } = useContext(TaskContext);

  return (
    <Sheet open={onOpenChange} onOpenChange={setOnOpenChange}>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-2xl">
              {sheetData && sheetData.title}
            </h1>
          </div>
        </SheetHeader>
        <div className="py-2 text-sm">
          <div className="flex">
            <p className="w-32 text-foregroundAccent">Status</p>
            <p className="capitalize">{sheetData && sheetData.status}</p>
          </div>
          <div className="flex">
            <p className="w-32  text-foregroundAccent">Start Date</p>
            <p>
              {sheetData &&
                format(new Date(sheetData.startDate), "MMM d, yyyy")}
            </p>
          </div>
          <div className="flex">
            <p className="w-32  text-foregroundAccent">End Date</p>
            <p>
              {sheetData && format(new Date(sheetData.dueDate), "MMM d, yyyy")}
            </p>
          </div>
          <div className="flex">
            <p className="w-32  text-foregroundAccent">Priority</p>
            <p className="capitalize">{sheetData && sheetData.priority}</p>
          </div>
          <div className="flex">
            <p className="w-32  text-foregroundAccent">Description</p>
            <p>{sheetData && sheetData.description}</p>
          </div>
        </div>
        <div>
          <h1>Sub Tasks</h1>
          <h1>Notes</h1>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailSheet;
