import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import ProjectDetails from "./components/project/ProjectDetails";
import TaskDetails from "./components/task/TaskDetails";

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await checkUserWithoutRedirect();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
      <ProjectDetails slug={params.slug} />
      <TaskDetails slug={params.slug} user={user} />
    </div>
  );
};

export default page;
