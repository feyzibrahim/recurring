import Group from "@/components/common/chat/group/Group";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="col-span-3 h-screen overflow-clip">
      <Group slug={params.slug} />
    </div>
  );
};

export default page;
