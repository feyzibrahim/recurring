import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import VideoCall from "@/components/common/VideoCall";

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await checkUserWithoutRedirect();

  return <VideoCall user={user} slug={params.slug} />;
};

export default page;
