import EmployeeNav from "../EmployeeNav";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-5">
      <EmployeeNav params={params} />
      Test
    </div>
  );
};

export default page;
