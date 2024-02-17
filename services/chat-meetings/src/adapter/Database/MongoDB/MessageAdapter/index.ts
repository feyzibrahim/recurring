import { injectable } from "inversify";
import { Message } from "../../../../Entities/Message";
import { createMessage } from "./functions/createMessage.adapter";
import { MessageAdapterInterface } from "../../../../interface/message/MessageAdapterInterface";
import { getMessages } from "./functions/getMessages.adapter";
import { updateMessage } from "./functions/updateMessage.adapter";

@injectable()
export class MessageAdapter implements MessageAdapterInterface {
  getMessages(chatId: string): Promise<boolean | Message[]> {
    return getMessages(chatId);
  }

  async createMessage(message: Message): Promise<boolean | Message> {
    return createMessage(message);
  }

  async updateMessage(
    id: string,
    message: Message
  ): Promise<boolean | Message> {
    return updateMessage(message);
  }
}
