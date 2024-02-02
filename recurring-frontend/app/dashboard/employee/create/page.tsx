import BackButton from "./BackButton";
import CreateForm from "./CreateForm";

const page = () => {
  return (
    <div className="p-5 md:px-10 md:py-5 w-full overflow-y-auto">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-2xl font-bold">Add Employee</h1>
        <BackButton />
      </div>
      <CreateForm />
    </div>
  );
};

export default page;
