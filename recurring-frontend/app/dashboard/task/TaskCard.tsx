"use client";
import { format } from "date-fns";
import { TaskTypes } from "@/constants/Types";
import { Draggable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { TaskContext } from "./TaskContextProvider";
import LowMediumHigh from "@/components/common/LowMediumHigh";

interface ItemProps {
  task: TaskTypes;
  index: number;
}

const TaskCard: React.FC<ItemProps> = ({ task, index }) => {
  const { setOnOpenChange, setSheetData } = useContext(TaskContext);

  return (
    <Draggable draggableId={task._id} index={index} key={index}>
      {(provided, snapshot) => (
        <div
          className={`bg-backgroundAccent p-5 h-fit rounded-md mb-5 ${
            snapshot.isDragging ? "opacity-70" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => {
            setOnOpenChange(true);
            setSheetData(task);
          }}
        >
          <div>{typeof task.project !== "string" ? task.project.name : ""}</div>
          <h1 className="text-lg font-bold">{task.title}</h1>
          <p className="text-foregroundAccent">
            {task.description ?? "No description were added"}
          </p>
          <div className="flex gap-2 items-center mt-3">
            <div className="border-2 border-secondary rounded-md w-fit px-2 py-1 ">
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </div>
            <LowMediumHigh priority={task.priority} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
