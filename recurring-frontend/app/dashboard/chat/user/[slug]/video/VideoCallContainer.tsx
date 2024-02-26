"use client";
import VideoCall from "@/components/common/VideoCall";
import { EmployeeTypes } from "@/constants/Types";
import { usePathname } from "next/navigation";
import React from "react";

const VideoCallContainer = ({ user }: { user: EmployeeTypes }) => {
  const path = usePathname();
  console.log(
    "file: VideoCallContainer.tsx:8 -> VideoCallContainer -> path",
    path
  );

  return (
    <div className="w-full">
      <VideoCall slug="asdfasdfasdfasdf" user={user} />
    </div>
  );
};

export default VideoCallContainer;
