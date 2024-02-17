import { inject, injectable } from "inversify";
import { ChatUseCaseInterface } from "../interface/chat/ChatUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Chat } from "../Entities/Chat";

@injectable()
export class ChatUseCase implements ChatUseCaseInterface {
  constructor(
    @inject(TYPES.ChatAdapterInterface)
    private iChatUseCase: ChatUseCaseInterface
  ) {}

  getChat(id: string): Promise<boolean | Chat> {
    return this.iChatUseCase.getChat(id);
  }
  getChats(userId: string): Promise<boolean | Chat[]> {
    return this.iChatUseCase.getChats(userId);
  }
  createChat(chat: Chat): Promise<boolean | Chat> {
    return this.iChatUseCase.createChat(chat);
  }
  updateChat(id: string, chat: Chat): Promise<boolean | Chat> {
    return this.iChatUseCase.updateChat(id, chat);
  }
  getChatsWithUserIds(
    userId: string,
    otherUser: string
  ): Promise<boolean | Chat[]> {
    return this.iChatUseCase.getChatsWithUserIds(userId, otherUser);
  }
}
