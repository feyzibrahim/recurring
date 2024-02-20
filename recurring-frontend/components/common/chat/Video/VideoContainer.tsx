"use client";
import React, { useContext, useState } from "react";
import { VideoContext } from "../VideoProvider/VideoContextProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VideoContainer = () => {
  const {
    myVideo,
    stream,
    cleanupStream,
    userVideo,
    callAccepted,
    callEnded,
    call,
    me,
    name,
    setName,
    leaveCall,
  } = useContext(VideoContext);

  const [idToCall, setIdToCall] = useState("");

  return (
    <div className="text-center">
      <div className="grid grid-cols-2">
        <div className="transform scale-x-[-1] p-5">
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className="rounded-xl"
          />
        </div>

        {callAccepted && !callEnded && (
          <div className="transform scale-x-[-1]">
            <video playsInline muted ref={userVideo} autoPlay />
          </div>
        )}
      </div>
      <Input value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
      <Button
        onClick={() => {
          cleanupStream();
          leaveCall();
        }}
        className="mt-5"
      >
        Stop
      </Button>
    </div>
  );
};

export default VideoContainer;
