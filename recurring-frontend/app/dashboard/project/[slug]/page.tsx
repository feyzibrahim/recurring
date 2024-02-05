import ProjectDetails from "./ProjectDetails";
import TaskDetails from "./TaskDetails";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="p-5 md:p-10 grid grid-cols-1 md:grid-cols-4 w-full">
      <ProjectDetails slug={params.slug} />
      <TaskDetails slug={params.slug} />
    </div>
  );
};

export default page;
