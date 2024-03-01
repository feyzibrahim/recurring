import ClientDetails from "@/components/common/client/ClientDetails";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="p-5 w-full">
      <ClientDetails slug={params.slug} />
    </div>
  );
};

export default page;
