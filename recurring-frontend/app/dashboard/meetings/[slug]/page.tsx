import VideoCall from "@/components/common/VideoCall";

const page = async ({ params }: { params: { slug: string } }) => {
  return <VideoCall slug={params.slug} />;
};

export default page;
