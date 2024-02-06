"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import CreateTaskButton from "@/components/common/task/CreateTaskButton";
import EmptyTask from "@/components/empty/EmptyTask";
import { useEffect, useMemo } from "react";
import { getTasks } from "@/app/lib/features/task/taskActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { TaskTypes } from "@/constants/Types";
import { updateTaskList } from "@/app/lib/features/task/taskSlice";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // If there is no destination or the source and destination are the same, do nothing
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    // If the source and destination are different, update the task list in the state
    const sourceTasks = groupedTasks[source.droppableId];
    const destinationTasks = groupedTasks[destination.droppableId];

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const updatedSourceTasks = Array.from(sourceTasks);
    const [removedTask] = updatedSourceTasks.splice(sourceIndex, 1);
    updatedSourceTasks.splice(destinationIndex, 0, removedTask);

    // Update the task list in the state
    const updatedGroupedTasks = {
      ...groupedTasks,
      [source.droppableId]: updatedSourceTasks,
    };

    // Dispatch an action to update the task list
    dispatch(updateTaskList(updatedGroupedTasks));
  };

  const groupedTasks = useMemo(() => {
    if (!tasks) return {};

    return tasks.reduce((groups: any, task) => {
      const { status } = task;
      if (!groups[status]) {
        groups[status] = [];
      }
      groups[status].push(task);
      return groups;
    }, {});
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
                    {tasks.length > 0 ? (
                      tasks.map((task: TaskTypes, index: number) => (
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
                      ))
                    ) : (
                      <EmptyTask />
                    )}
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
  );
};

export default TaskList;
