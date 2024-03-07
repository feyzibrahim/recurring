"use client";
import { EmployeeTypes } from "@/constants/Types";
import React, { useEffect, useRef } from "react";

const VideoCall = ({ user, slug }: { user: EmployeeTypes; slug: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const joinMeeting = async (element: any) => {
    if (typeof window !== "undefined") {
      try {
        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverId = String(process.env.NEXT_PUBLIC_ZEGO_SERVER_ID);

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverId,
          slug,
          user._id,
          user.username
        );
        console.log(
          "file: VideoCall.tsx:25 -> joinMeeting -> kitToken",
          kitToken
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container: element,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          showPreJoinView: false,
        });
      } catch (error) {
        console.log("file: VideoCall.tsx:35 -> joinMeeting -> error", error);
      }
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      joinMeeting(containerRef.current);
    }
  }, []);

  return <div ref={containerRef} className="w-full h-screen"></div>;
};

export default VideoCall;
