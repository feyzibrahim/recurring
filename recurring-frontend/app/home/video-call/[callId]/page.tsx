import React from "react";
import VideoCallContainer from "./VideoCallContainer";
import { checkUserWithoutRedirectInHome } from "@/server/checkUserWithoutRedirectInHome";

const page = async ({ params }: { params: { callId: string } }) => {
  const user = await checkUserWithoutRedirectInHome();

  return (
    <div className="w-full h-screen">
      <VideoCallContainer user={user} callId={params.callId} />
    </div>
  );
};

export default page;
