import BackButton from "./BackButton";
import CreateForm from "./EditForm";

const page = () => {
  return (
    <div className="p-5 w-full overflow-y-auto">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-2xl font-bold">Edit Employee</h1>
        <BackButton />
      </div>
      <CreateForm />
    </div>
  );
};

export default page;
