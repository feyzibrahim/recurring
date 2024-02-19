import { Socket } from "socket.io";

const onlineUser = (
  onlineUsersList: { userId: string; socketId: string }[],
  userId: string,
  socket: Socket
) => {
  onlineUsersList = onlineUsersList.filter((user) => user.userId !== userId);

  onlineUsersList.push({ userId, socketId: socket.id });
};

export default onlineUser;
