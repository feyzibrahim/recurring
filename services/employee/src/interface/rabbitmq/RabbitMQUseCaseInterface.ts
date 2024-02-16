export interface RabbitMQUseCaseInterface {
  sendDataToQueue(queue: string, data: any): boolean;
}
