import BackButton from "./BackButton";
import CreateForm from "./CreateForm";

const page = () => {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Create Project</h1>
        <BackButton />
      </div>
      <CreateForm />
    </div>
  );
};

export default page;
