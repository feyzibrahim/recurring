import ProjectModel from "../Modal/ProjectModel";

const fetchProjectsForTomorrow = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const projects = await ProjectModel.find({
      endDate: {
        $gte: tomorrow.setHours(0, 0, 0, 0),
        $lt: tomorrow.setHours(23, 59, 59, 999),
      },
    })
      .populate("members", "email")
      .populate("manager", "email");

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default fetchProjectsForTomorrow;
