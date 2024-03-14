"use client";
import VideoCall from "@/components/common/VideoCall";
import React from "react";

const VideoCallContainer = ({ callId }: { callId: string }) => {
  return (
    <div className="w-full">
      <VideoCall slug={callId} />
    </div>
  );
};

export default VideoCallContainer;
