import EmployeeNav from "./EmployeeNav";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EmployeeNav params={params} />
      Hello World {params.id}
    </div>
  );
};

export default page;
