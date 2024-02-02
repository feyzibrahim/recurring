import { QUEUES } from "../../constants/types/queue";
import { channel, connectRabbitMq } from "./rabbitmqConnection";

export const employeeCreationDataFromQueue = async () => {
  try {
    if (!channel) await connectRabbitMq();

    await channel.assertQueue(QUEUES.EMPLOYEECREATION);
    channel.consume(QUEUES.EMPLOYEECREATION, (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        console.log("🚀 ~ channel.consume ~ response:", response);
        channel.ack(data);
      }
    });
  } catch (error) {
    console.log(
      "🚀 ~ employeeUserCreation ~ employeeCreationDataFromQueue ~ error:",
      error
    );
  }
};
