"use client";
import { format } from "date-fns";
import { TaskTypes } from "@/constants/Types";
import { Draggable } from "@hello-pangea/dnd";

interface ItemProps {
  task: TaskTypes;
  index: number;
}

const TaskCard: React.FC<ItemProps> = ({ task, index }) => {
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
        >
          <div>{typeof task.project !== "string" ? task.project.name : ""}</div>
          <h1 className="text-lg font-bold">{task.title}</h1>
          <p className="text-foregroundAccent">
            {task.description ?? "No description were added"}
          </p>
          <div className="border-2 border-secondary rounded-md w-fit px-2 py-1 mt-3">
            {format(new Date(task.dueDate), "MMM d, yyyy")}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
