import VideoCall from "@/components/common/VideoCall";
import { checkUserWithoutRedirectInManager } from "@/server/checkUserWithoutRedirectInManager";

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await checkUserWithoutRedirectInManager();

  return <VideoCall user={user} slug={params.slug} />;
};

export default page;
