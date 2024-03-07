"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { EmployeeTypes } from "@/constants/Types";
import { Socket, io } from "socket.io-client";
import { API_ROUTES } from "@/lib/routes";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathName = usePathname();
  let path = pathName.split("/");
  let curr = path[1];

  useEffect(() => {
    let connect: Socket = io(API_ROUTES.CHAT as string);
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
  const acceptCall = (data: {
    from: string;
    to: string;
    callId: string;
    user: EmployeeTypes;
  }) => {
    let from = data.from;
    let to = data.to;
    data.from = to;
    data.to = from;
    socket && socket.emit("video-call-accepted", data);

    router.replace(`/${curr}/video-call/${data.callId}`);
  };

  const [callCancelledByCaller, setCallCancelledByCaller] = useState(false);

  useEffect(() => {
    socket &&
      socket.on(
        "message",
        (data: { messageSaved: { content: string }; fromName: string }) => {
          toast({
            title: "New Message",
            description: `${data.fromName}: ${data.messageSaved.content ?? ""}`,
            variant: "light",
          });
        }
      );

    socket &&
      socket.on(
        "video-call",
        (data: {
          from: string;
          to: string;
          callId: string;
          user: EmployeeTypes;
        }) => {
          toast({
            title: "Video Call",
            description: `${user.firstName} ${user.lastName}`,
            variant: "light",
            duration: 45000,
            action: (
              <div className="flex gap-2">
                <ToastAction
                  altText="Accept Call"
                  className="border-none hover:bg-none bg-green-700"
                >
                  <p onClick={() => acceptCall(data)}>Accept</p>
                </ToastAction>
                <ToastAction
                  altText="Decline Call"
                  className="border-none hover:bg-none bg-red-700"
                >
                  <p className="" onClick={() => declineCall(data)}>
                    Decline
                  </p>
                </ToastAction>
              </div>
            ),
          });
        }
      );
    socket &&
      socket.on("video-call-hangup", (data) => {
        console.log(
          "file: UserContextProvider.tsx:95 -> socket.on -> data",
          data
        );
        setCallCancelledByCaller(true);
      });
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
