"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { EmployeeTypes } from "@/constants/Types";
import { Socket, io } from "socket.io-client";
import { API_ROUTES } from "@/lib/routes";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";

interface UserContextType {
  user: EmployeeTypes | null;
  socket: Socket | undefined;
}

const UserContext = createContext<UserContextType>({
  user: null,
  socket: undefined,
});

const UserContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: EmployeeTypes;
}) => {
  let [socket, setSocket] = useState<Socket>();
  const { toast } = useToast();

  useEffect(() => {
    let connect: Socket = io(API_ROUTES.CHAT);
    connect.emit("online-user", user._id);
    setSocket(connect);
    return () => {
      connect.emit("offline-user", user._id);
      connect.disconnect();
    };
  }, [user._id]);

  const declineCall = (data: { from: string; to: string; callId: string }) => {
    let from = data.from;
    let to = data.to;
    data.from = to;
    data.to = from;
    socket && socket.emit("video-call-declined", data);
  };

  useEffect(() => {
    socket &&
      socket.on(
        "video-call",
        (data: { from: string; to: string; callId: string }) => {
          toast({
            title: "Video Call",
            description: "Just Testing",
            variant: "light",
            duration: 45000,
            action: (
              <div className="">
                <ToastAction
                  altText="Accept Call"
                  className="border-none hover:bg-none"
                >
                  <Link href={`/chat/${data.callId}`}>
                    <Button>Accept</Button>
                  </Link>
                </ToastAction>
                <ToastAction
                  altText="Decline Call"
                  className="border-none hover:bg-none"
                >
                  <Button
                    variant="destructive"
                    onClick={() => declineCall(data)}
                  >
                    Decline
                  </Button>
                </ToastAction>
              </div>
            ),
          });
        }
      );
  }, [socket]);

  return (
    <UserContext.Provider
      value={{
        user,
        socket,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
