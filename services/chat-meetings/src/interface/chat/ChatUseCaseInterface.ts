import { Chat } from "../../Entities/Chat";

export interface ChatUseCaseInterface {
  getChat(id: string): Promise<Chat | boolean>;
  getChats(userId: string): Promise<Chat[] | boolean>;
  createChat(employee: Chat): Promise<Chat | boolean>;
  updateChat(id: string, employee: Chat): Promise<Chat | boolean>;
  getChatsWithUserIds(
    userId: string,
    otherUser: string
  ): Promise<Chat[] | boolean>;
}
