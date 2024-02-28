import React from "react";
import VideoCallContainer from "./VideoCallContainer";
import { checkUserWithoutRedirectInManager } from "@/server/checkUserWithoutRedirectInManager";

const page = async ({ params }: { params: { callId: string } }) => {
  const user = await checkUserWithoutRedirectInManager();

  return (
    <div className="col-span-3 h-screen">
      <VideoCallContainer user={user} callId={params.callId} />
    </div>
  );
};

export default page;
