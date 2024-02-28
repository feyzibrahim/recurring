import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import React from "react";
import VideoCallContainer from "./VideoCallContainer";

const page = async ({ params }: { params: { callId: string } }) => {
  const user = await checkUserWithoutRedirect();

  return (
    <div className="col-span-3 h-screen">
      <VideoCallContainer user={user} callId={params.callId} />
    </div>
  );
};

export default page;
