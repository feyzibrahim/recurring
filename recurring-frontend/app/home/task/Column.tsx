"use client";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { TaskTypes } from "@/constants/Types";

interface ColumnProps {
  col: {
    id: string;
    list: TaskTypes[];
  };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div>
          <div className="bg-backgroundAccent px-5 py-2 rounded-md capitalize">
            <h1>{id}</h1>
          </div>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-96 pt-5"
          >
            {list.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default Column;
