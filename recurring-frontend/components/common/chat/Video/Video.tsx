"use client";
import React, { useContext } from "react";
import VideoContextWrapper from "../VideoProvider/VideoContextWrapper";
import { EmployeeTypes } from "@/constants/Types";
import VideoContainer from "./VideoContainer";
import { UserContext } from "../UserProvider/UserContextProvider";

const Video = ({ user }: { user: EmployeeTypes }) => {
  const { socket } = useContext(UserContext);

  return (
    <VideoContextWrapper user={user} socket={socket}>
      <VideoContainer />
    </VideoContextWrapper>
  );
};

export default Video;
