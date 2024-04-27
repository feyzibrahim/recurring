import { injectable } from "inversify";
import { Message } from "../../../../Entities/Message";
import { createMessage } from "./functions/createMessage.adapter";
import { MessageAdapterInterface } from "../../../../interface/message/MessageAdapterInterface";
import { getMessages } from "./functions/getMessages.adapter";
import { updateMessage } from "./functions/updateMessage.adapter";
import { createGroupMessage } from "./functions/createGroupMessage.adapter";
import { getGroupMessages } from "./functions/getGroupMessages";

@injectable()
export class MessageAdapter implements MessageAdapterInterface {
  getMessages(chatId: string): Promise<boolean | Message[]> {
    return getMessages(chatId);
  }
  getGroupMessages(chatId: string): Promise<boolean | Message[]> {
    return getGroupMessages(chatId);
  }

  async createMessage(message: Message): Promise<boolean | Message> {
    return createMessage(message);
  }
  async createGroupMessage(message: Message): Promise<boolean | Message> {
    return createGroupMessage(message);
  }

  async updateMessage(
    id: string,
    message: Message
  ): Promise<boolean | Message> {
    return updateMessage(message);
  }
}
