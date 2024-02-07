"use client";
// TaskList.tsx
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateTaskButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";
import TaskCard from "./TaskCard";
import { TaskTypes } from "@/constants/Types";
import useTaskHook from "./useTaskHook";

const TaskList = () => {
  const { tasks, handleDragEnd, groupedTasks } = useTaskHook();

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Task</h1>
        <CreateTaskButton />
      </div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sm">
          {tasks ? (
            Object.entries(groupedTasks).map(
              ([status, tasks]: [status: string, tasks: any]) => (
                <Droppable droppableId={status} key={status}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div className="mb-3 px-5 py-2 bg-backgroundAccent rounded-md">
                        <h2 className="text-lg font-semibold capitalize">
                          {status}
                        </h2>
                      </div>
                      {tasks.map((task: TaskTypes, index: number) => (
                        <Draggable
                          draggableId={task._id}
                          index={index}
                          key={task._id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full col-span-4">
              <EmptyTask />
              <p className="mt-2">No Tasks were created</p>
              <p className="text-sm py-2">Please Create One</p>
              <CreateTaskButton />
            </div>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
