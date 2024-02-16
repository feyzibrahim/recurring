import { inject, injectable } from "inversify";
import { RabbitMQUseCaseInterface } from "../interface/rabbitmq/RabbitMQUseCaseInterface";
import { TYPES } from "../constants/types/types";

@injectable()
export class RabbitMQUseCase implements RabbitMQUseCaseInterface {
  constructor(
    @inject(TYPES.RabbitMQServiceInitializer)
    private iRabbitMQUseCase: RabbitMQUseCaseInterface
  ) {}

  sendDataToQueue(queue: string, data: any): boolean {
    return this.iRabbitMQUseCase.sendDataToQueue(queue, data);
  }
}
