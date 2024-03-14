"use client";
import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "./chat/UserProvider/UserContextProvider";

const VideoCall = ({ slug }: { slug: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);

  const joinMeeting = async (element: any) => {
    if (typeof window !== "undefined") {
      try {
        const { ZegoUIKitPrebuilt } = await import(
          "@zegocloud/zego-uikit-prebuilt"
        );

        const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverId = String(process.env.NEXT_PUBLIC_ZEGO_SERVER_ID);

        if (user) {
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
        }
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
