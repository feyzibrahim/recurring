import { inject, injectable } from "inversify";
import { MessageUseCaseInterface } from "../interface/message/MessageUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Message } from "../Entities/Message";

@injectable()
export class MessageUseCase implements MessageUseCaseInterface {
  constructor(
    @inject(TYPES.MessageAdapterInterface)
    private iMessageUseCase: MessageUseCaseInterface
  ) {}

  getMessages(userId: string): Promise<boolean | Message[]> {
    return this.iMessageUseCase.getMessages(userId);
  }
  createMessage(chat: Message): Promise<boolean | Message> {
    return this.iMessageUseCase.createMessage(chat);
  }
  updateMessage(id: string, chat: Message): Promise<boolean | Message> {
    return this.iMessageUseCase.updateMessage(id, chat);
  }
}
