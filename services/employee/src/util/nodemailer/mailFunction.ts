import mailSender from "./mailSender";

const sendEmployeeInvitation = async (
  email: string,
  invitationLink: string,
  employeeName: string
): Promise<void> => {
  const mailResponse = await mailSender(
    email,
    "Employee Invitation",
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
    
        .invitation-link {
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
          <h1>Employee Invitation</h1>
        </div>
        <div class="content">
          <p>Hello ${employeeName},</p>
          <p>We hope this email finds you well. You have been invited to join our a company at recurring!</p>
          <p>To accept the invitation and set up your account, click the link below:</p>
          <a href="${invitationLink}" class="invitation-link" target="_blank">Accept Invitation</a>
          <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@recurring.com">support@recurring.com</a>.</p>
          <p>We look forward to having you on board!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} recurring</p>
        </div>
      </div>
    </body>
    </html>
    `
  );

  if (mailResponse) {
    console.log("Employee invitation email sent successfully.");
  } else {
    console.error("Failed to send employee invitation email.");
  }
};

export { sendEmployeeInvitation };
