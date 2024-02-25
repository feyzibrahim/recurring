import VideoCall from "@/components/common/VideoCall";
import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await checkUserWithoutRedirectInHome();

  return <VideoCall user={user} slug={params.slug} />;
};

export default page;
