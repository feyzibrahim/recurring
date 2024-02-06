import { COLORS } from "@/constants/Colors";
import { TaskTypes } from "@/constants/Types";
import { format } from "date-fns";

const TaskCard = ({ task }: { task: TaskTypes }) => {
  return (
    <div className="bg-backgroundAccent p-5 h-fit rounded-md mb-5">
      {/* <div
        className={
          COLORS[task.status] +
          " text-white px-2 py-1 w-fit rounded mb-2 capitalize"
        }
      >
        {task.status}
      </div> */}
      <h1 className="text-lg font-bold">{task.title}</h1>
      <p className="text-foregroundAccent">
        {task.description ?? "No description were added"}
      </p>
      <div className="border-2 border-secondary rounded-md w-fit px-2 py-1 mt-3">
        {format(new Date(task.dueDate), "MMM d, yyyy")}
      </div>
    </div>
  );
};

export default TaskCard;
