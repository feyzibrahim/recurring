import mailSender from "./mailSender";

const sendProjectReminderEmail = async (
  email: string,
  projectName: string
): Promise<void> => {
  const mailResponse = await mailSender(
    email,
    "Project Reminder",
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
    
        .header h1 {
          color: #333333;
        }
    
        .content {
          color: #555555;
        }
    
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #888888;
          font-size: 14px;
        }
    
        .footer a {
          color: #007bff;
          text-decoration: none;
        }
    
        .footer a:hover {
          text-decoration: underline;
        }
    
        .project-link {
          display: block;
          text-align: center;
          margin-top: 20px;
          padding: 10px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Project Reminder</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>This is a friendly reminder that your project <strong>${projectName}</strong> is ending tomorrow. Please make sure all tasks are completed and any necessary actions are taken.</p>
          <p>Thank you for your attention to this matter.</p>
          <a href="#" class="project-link" target="_blank">View Project</a>
        </div>
        <div class="footer">
          <p>Thank you for using our service.</p>
          <p>&copy; 2024 Recurring App</p>
          <p>Questions or concerns? Contact us at <a href="mailto:support@recurringapp.com">support@recurringapp.com</a></p>
        </div>
      </div>
    </body>
    </html>
    `
  );

  if (mailResponse) {
    console.log("Project reminder email sent successfully: ");
  } else {
    console.error("Failed to send project reminder email.");
  }
};

const sendTaskReminderEmail = async (
  email: string,
  taskTitle: string
): Promise<void> => {
  const mailResponse = await mailSender(
    email,
    "Task Reminder",
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
    
        .header h1 {
          color: #333333;
        }
    
        .content {
          color: #555555;
        }
    
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #888888;
          font-size: 14px;
        }
    
        .footer a {
          color: #007bff;
          text-decoration: none;
        }
    
        .footer a:hover {
          text-decoration: underline;
        }
    
        .task-link {
          display: block;
          text-align: center;
          margin-top: 20px;
          padding: 10px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Task Reminder</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>This is a friendly reminder that your task <strong>${taskTitle}</strong> is due tomorrow. Please make sure it is completed on time.</p>
          <p>Thank you for your attention to this matter.</p>
          <a href="#" class="task-link" target="_blank">View Task</a>
        </div>
        <div class="footer">
          <p>Thank you for using our service.</p>
          <p>&copy; 2024 Recurring App</p>
          <p>Questions or concerns? Contact us at <a href="mailto:support@recurringapp.com">support@recurringapp.com</a></p>
        </div>
      </div>
    </body>
    </html>
    `
  );

  if (mailResponse) {
    console.log("Project reminder email sent successfully: ");
  } else {
    console.error("Failed to send project reminder email.");
  }
};

export { sendProjectReminderEmail, sendTaskReminderEmail };
