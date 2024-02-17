import EmptyProject from "@/components/empty/EmptyProjects";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";

const page = async () => {
  await checkUserWithoutRedirect();

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyProject />
        <p className="mt-2">Dashboard Yet To be designed</p>
        <p className="text-sm py-2">Will be updated Later</p>
      </div>
    </div>
  );
};

export default page;
