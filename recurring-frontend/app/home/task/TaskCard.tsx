"use client";
import { format } from "date-fns";
import { SubTaskTypes, TaskTypes } from "@/constants/Types";
import { Draggable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { TaskContext } from "./TaskContextProvider";
import LowMediumHigh from "@/components/common/LowMediumHigh";
import { useAppDispatch } from "@/app/lib/hook";
import { setTask } from "@/app/lib/features/task/taskSlice";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { FiClock } from "react-icons/fi";

interface ItemProps {
  task: TaskTypes;
  index: number;
}

const TaskCard: React.FC<ItemProps> = ({ task, index }) => {
  const { setOnOpenChange, setSheetData } = useContext(TaskContext);
  const dispatch = useAppDispatch();
  const calculateCompletion = () => {
    const subTask: SubTaskTypes[] = task.subTasks;
    let completed = 0;
    subTask.map((sub) => {
      if (sub.status === "completed") {
        completed++;
      }
    });

    if (subTask.length === 0) {
      return null;
    }

    return (
      <div
        className={`flex items-center gap-2 ${
          completed === subTask.length && "text-green-500"
        }`}
      >
        {completed === subTask.length ? (
          <MdOutlineCheckCircleOutline className="text-xl text-green-500" />
        ) : (
          <FiClock className="text-xl" />
        )}
        {completed ?? ""}/{subTask.length}
      </div>
    );
  };

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
            dispatch(setTask({ task }));
          }}
        >
          <div>{typeof task.project !== "string" ? task.project.name : ""}</div>
          <h1 className="text-lg font-bold">{task.title}</h1>
          <p className="text-foregroundAccent">
            {task.description ?? "No description were added"}
          </p>
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-2 items-center">
              <div className="border-2 border-secondary rounded-md w-fit px-2 py-1 ">
                {format(new Date(task.dueDate), "MMM d, yyyy")}
              </div>
              <LowMediumHigh priority={task.priority} />
            </div>
            {task.subTasks && calculateCompletion()}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
