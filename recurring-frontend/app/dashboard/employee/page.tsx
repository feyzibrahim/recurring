import EmployeeList from "./EmployeeList";
const page = () => {
  return (
    <div className="p-5 md:px-10 md:py-5 w-full overflow-auto">
      <EmployeeList />
    </div>
  );
};

export default page;
