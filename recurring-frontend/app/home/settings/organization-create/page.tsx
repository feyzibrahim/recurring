import CreateButton from "./CreateButton";

const page = () => {
  return (
    <div className="flex items-center justify-center pt-20">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-textPrimary">
          Organization is not created yet!
        </h1>
        <p className="text-xl text-textSecondary my-4">
          Click Below button to get started
        </p>
        <CreateButton />
      </main>
    </div>
  );
};

export default page;
