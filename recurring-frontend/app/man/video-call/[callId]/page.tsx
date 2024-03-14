import React from "react";
import VideoCallContainer from "./VideoCallContainer";

const page = async ({ params }: { params: { callId: string } }) => {
  return (
    <div className="w-full h-screen">
      <VideoCallContainer callId={params.callId} />
    </div>
  );
};

export default page;
