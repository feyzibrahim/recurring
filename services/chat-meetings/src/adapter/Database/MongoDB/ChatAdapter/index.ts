import { injectable } from "inversify";
import { Chat } from "../../../../Entities/Chat";
import { createChat } from "./functions/createChat.adapter";
import { getChat } from "./functions/getChat.adapter";
import { ChatAdapterInterface } from "../../../../interface/chat/ChatAdapterInterface";
import { getChats } from "./functions/getChats.adapter";
import { updateChat } from "./functions/updateChat.adapter";
import { getChatsWithUserIds } from "./functions/getChatsWithUserIds";

@injectable()
export class ChatAdapter implements ChatAdapterInterface {
  getChats(organizationId: string): Promise<boolean | Chat[]> {
    return getChats(organizationId);
  }

  async getChat(id: string): Promise<boolean | Chat> {
    return getChat(id);
  }

  async createChat(Chat: Chat): Promise<boolean | Chat> {
    return createChat(Chat);
  }

  async updateChat(id: string, chat: Chat): Promise<boolean | Chat> {
    return updateChat(chat);
  }

  async getChatsWithUserIds(
    userId: string,
    otherUser: string
  ): Promise<boolean | Chat[]> {
    return getChatsWithUserIds(userId, otherUser);
  }
}
