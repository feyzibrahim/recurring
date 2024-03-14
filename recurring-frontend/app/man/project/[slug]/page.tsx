import ProjectDetails from "@/components/common/project/projectTask/project/ProjectDetails";
import TaskDetails from "@/components/common/project/projectTask/task/TaskDetails";

const page = async ({ params }: { params: { slug: string } }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
      <ProjectDetails slug={params.slug} />
      <TaskDetails slug={params.slug} />
    </div>
  );
};

export default page;
