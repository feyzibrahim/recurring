import TaskModel from "../Modal/TaskModel";

const fetchTasksForTomorrow = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    // Fetch tasks for tomorrow
    const tasks = await TaskModel.find({
      dueDate: {
        $gte: tomorrow.setHours(0, 0, 0, 0),
        $lt: tomorrow.setHours(23, 59, 59, 999),
      },
    }).populate("assignee", "email");

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export default fetchTasksForTomorrow;
