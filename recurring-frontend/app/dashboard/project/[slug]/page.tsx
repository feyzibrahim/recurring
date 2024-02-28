import ProjectDetails from "@/components/common/project/projectTask/project/ProjectDetails";
import TaskDetails from "@/components/common/project/projectTask/task/TaskDetails";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";

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
