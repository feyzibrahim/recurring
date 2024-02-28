import TaskDetails from "@/components/common/project/projectTask/task/TaskDetails";
import ProjectDetails from "./components/ProjectDetails";
import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await checkUserWithoutRedirectInHome();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
      <ProjectDetails slug={params.slug} />
      <TaskDetails slug={params.slug} user={user} />
    </div>
  );
};

export default page;
