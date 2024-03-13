import { Channel } from "amqplib";
import { Employee } from "../../../Entities/Employee";
import { EmployeeAdapterInterface } from "../../../interface/employee/EmployeeAdapterInterface";

export const consumeMessages = async (
  channel: Channel,
  queue: string,
  userAdapter: EmployeeAdapterInterface
) => {
  try {
    await channel.assertQueue(queue);
    channel.consume(queue, async (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        const employee = JSON.parse(response) as Employee;
        console.log(
          "file: ConsumeMessages.ts:16 -> channel.consume -> employee",
          employee
        );

        await userAdapter.updateEmployee(employee._id, employee);

        channel.ack(data);
      }
    });
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
};
