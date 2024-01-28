import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";

const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="min-h-screen p-10 overflow-y-scroll w-full">
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
