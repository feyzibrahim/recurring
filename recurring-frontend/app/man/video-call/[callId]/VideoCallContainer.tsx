"use client";
import VideoCall from "@/components/common/VideoCall";
import { EmployeeTypes } from "@/constants/Types";
import React from "react";

const VideoCallContainer = ({
  user,
  callId,
}: {
  user: EmployeeTypes;
  callId: string;
}) => {
  return (
    <div className="w-full">
      <VideoCall slug={callId} user={user} />
    </div>
  );
};

export default VideoCallContainer;
