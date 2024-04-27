import fetchProjectsForTomorrow from "../../adapter/Database/MongoDB/general/fetchProjectsForTomorrow";
import { sendProjectReminderEmail } from "./mailFunction";

const sendReminder = async () => {
  const projects = await fetchProjectsForTomorrow();
  if (projects.length === 0) {
    console.log("No projects with end date set for tomorrow.");
    return;
  }

  console.log("Found projects with end date set for tomorrow:", projects);

  projects.forEach(async (project) => {
    const emails = [];
    if (typeof project.members !== "string") {
      project.members.forEach((member: any) => emails.push(member.email));
      if (project.manager && typeof project.manager !== "string")
        emails.push(project.manager.email);

      emails.map(async (email) => {
        await sendProjectReminderEmail(email, project.name);
      });
      console.log("Reminder emails sent for project:", project.name);
    }
  });
};

export default sendReminder;
