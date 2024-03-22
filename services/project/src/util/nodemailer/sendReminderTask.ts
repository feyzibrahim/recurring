import fetchTasksForTomorrow from "../../adapter/Database/MongoDB/general/fetchTasksForTomorrow";
import { sendTaskReminderEmail } from "./mailFunction";

const sendReminderTask = async () => {
  const tasks = await fetchTasksForTomorrow();
  if (tasks.length === 0) {
    console.log("No tasks with due date set for tomorrow.");
    return;
  }

  console.log("Found tasks with due date set for tomorrow:", tasks);

  tasks.forEach(async (task) => {
    if (
      task.assignee &&
      typeof task.assignee !== "string" &&
      task.assignee.email
    ) {
      await sendTaskReminderEmail(task.assignee.email, task.title);
      console.log("Reminder email sent for task:", task.title);
    }
  });
};

export default sendReminderTask;
