import React, { ReactNode } from "react";
import { VideoContextProvider } from "./VideoContextProvider";
import { EmployeeTypes } from "@/constants/Types";
import { Socket } from "socket.io-client";

const VideoContextWrapper = ({
  children,
  user,
  socket,
}: {
  children: ReactNode;
  user: EmployeeTypes;
  socket: Socket | undefined;
}) => {
  return (
    <VideoContextProvider user={user} socket={socket}>
      {children}
    </VideoContextProvider>
  );
};

export default VideoContextWrapper;
