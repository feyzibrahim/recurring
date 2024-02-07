"use client";
import { DragDropContext } from "@hello-pangea/dnd";
import CreateTaskButton from "@/components/common/task/CreateTaskButton";
import Column from "./Column";
import useTaskHook from "./useTaskHook";

const TaskList = () => {
  const { columns, onDragEnd } = useTaskHook();

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
    </div>
  );
};

export default TaskList;
