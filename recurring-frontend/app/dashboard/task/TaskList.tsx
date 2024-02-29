"use client";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useContext, useState } from "react";
import TaskDetailSheet from "./TaskDetailSheet";
import { TaskContext } from "./TaskContextProvider";
import CreateTaskButton from "./CreateTaskButton";
import { EmployeeTypes } from "@/constants/Types";

const TaskList = ({ user }: { user: EmployeeTypes }) => {
  const { columns, onDragEnd } = useContext(TaskContext);
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Task</h1>
        <CreateTaskButton />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sm">
          {columns &&
            Object.values(columns).map((col, index) => (
              <Column col={col} key={index} />
            ))}
        </div>
      </DragDropContext>
      <TaskDetailSheet user={user} />
    </div>
  );
};

export default TaskList;
