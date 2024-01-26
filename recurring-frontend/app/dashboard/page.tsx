const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="h-screen p-10">
      <div className="flex gap-5">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            Hello World
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
