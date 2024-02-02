import EmployeeDetails from "./EmployeeDetails";
import EmployeeNav from "./EmployeeNav";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EmployeeNav params={params} />
      <EmployeeDetails id={params.id} />
    </div>
  );
};

export default page;
