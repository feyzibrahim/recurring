"use client";
import React, { useContext } from "react";
import { VideoContext } from "../VideoProvider/VideoContextProvider";
import { Button } from "@/components/ui/button";

const VideoContainer = () => {
  const { myVideo, stream, cleanupStream } = useContext(VideoContext);

  return (
    <div>
      Test
      <div className="">
        <video playsInline muted ref={myVideo} autoPlay />
      </div>
      <Button onClick={() => cleanupStream()}>Stop</Button>
    </div>
  );
};

export default VideoContainer;
