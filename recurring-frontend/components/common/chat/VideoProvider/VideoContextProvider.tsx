"use client";
import { EmployeeTypes } from "@/constants/Types";
import { ReactNode, createContext, useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import Peer from "simple-peer";
import { useRouter } from "next/navigation";

// Define VideoContextTypes
interface VideoContextTypes {
  call: any;
  callAccepted: boolean;
  myVideo: any;
  userVideo: any;
  stream: MediaStream | undefined;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  callEnded: boolean;
  me: string;
  callUser: (id: string) => void;
  leaveCall: () => void;
  answerCall: () => void;
  cleanupStream: () => void;
}

// Define the VideoContext
const VideoContext = createContext<VideoContextTypes>({
  call: null,
  callAccepted: false,
  myVideo: null,
  userVideo: null,
  stream: undefined,
  name: "",
  setName: () => {},
  callEnded: false,
  me: "",
  callUser: () => {},
  leaveCall: () => {},
  answerCall: () => {},
  cleanupStream: () => {},
});

const VideoContextProvider = ({
  children,
  user,
  socket,
}: {
  children: ReactNode;
  user: EmployeeTypes;
  socket: Socket | undefined;
}) => {
  const [stream, setStream] = useState<MediaStream>();
  const [me, setMe] = useState("");
  const [call, setCall] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  const cleanupStream = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((ele) => {
        ele.stop();
        router.back();
      });
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    socket && socket.on("me", (id) => setMe(id));
    socket &&
      socket.on("video-call-user", ({ from, name: callerName, signal }) => {
        setCall({ isReceivedCall: true, from, name: callerName, signal });
      });

    return cleanupStream;
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket && socket.emit("answer-call", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket &&
        socket.emit("video-call-user", {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket &&
      socket.on("call-accepted", (signal: any) => {
        setCallAccepted(true);

        peer.signal(signal);
      });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <VideoContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        cleanupStream,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoContextProvider };
