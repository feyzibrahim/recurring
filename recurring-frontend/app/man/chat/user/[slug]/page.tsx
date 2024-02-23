import Chat from "@/components/common/chat/Chat";

const page = async ({ params }: { params: { slug: string } }) => {
  return (
    <div className="col-span-3 h-screen overflow-clip">
      <Chat username={params.slug} />
    </div>
  );
};

export default page;
