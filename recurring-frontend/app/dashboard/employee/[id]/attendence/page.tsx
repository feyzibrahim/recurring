import EmployeeNav from "../EmployeeNav";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EmployeeNav params={params}/>
      Test
    </div>
  );
};

export default page;
