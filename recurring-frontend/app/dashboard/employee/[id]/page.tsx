import EmployeeDetails from "./EmployeeDetails";
import EmployeeNav from "./EmployeeNav";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-5">
      <EmployeeNav params={params} />
      <EmployeeDetails id={params.id} />
    </div>
  );
};

export default page;
