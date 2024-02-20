import EmployeeNav from "../EmployeeNav";
import TaskList from "./TaskList";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-5">
      <EmployeeNav params={params} />
      <TaskList />
    </div>
  );
};

export default page;
