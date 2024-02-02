import ampq, { Channel, Connection } from "amqplib";
import { employeeCreationDataFromQueue } from "./employeeUserCreation";

let channel: Channel;
let connection: Connection;
const connectRabbitMq = async () => {
  try {
    const rabbitmq_url = process.env.RABBITMQ_URL || "";
    connection = await ampq.connect(rabbitmq_url);

    channel = await connection.createChannel();
    console.log("Successfully Connected to RabbitMQ");

    employeeCreationDataFromQueue();
  } catch (error) {
    console.log("🚀 ~ connectRabbitMq ~ error:", error);
  }
};

export { connectRabbitMq, channel };
