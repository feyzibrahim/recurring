import { Message } from "../../Entities/Message";

export interface MessageUseCaseInterface {
  getMessages(chat: string): Promise<Message[] | boolean>;
  getGroupMessages(chat: string): Promise<Message[] | boolean>;
  createMessage(chat: Message): Promise<Message | boolean>;
  createGroupMessage(chat: Message): Promise<Message | boolean>;
  updateMessage(id: string, chat: Message): Promise<Message | boolean>;
}
