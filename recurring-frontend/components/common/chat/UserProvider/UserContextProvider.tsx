"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { EmployeeTypes } from "@/constants/Types";
import { Socket, io } from "socket.io-client";
import { API_ROUTES } from "@/lib/routes";

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

  useEffect(() => {
    let connect: Socket = io(API_ROUTES.CHAT);
    connect.emit("online-user", user._id);
    setSocket(connect);
    return () => {
      connect.emit("offline-user", user._id);
    };
  }, [user._id]);

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
