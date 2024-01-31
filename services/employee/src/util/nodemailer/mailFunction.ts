import mailSender from "./mailSender";

const sendVerificationMail = async (
  email: string,
  link: string
): Promise<void> => {
  const mailResponse = await mailSender(
    email,
    "Email Verification",
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
    
        .verify-link {
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
          <h1>Email Confirmation</h1>
        </div>
        <div class="content">
          <p>Hello User,</p>
          <p>We hope this email finds you well. Your account with Recurring App is almost ready!</p>
          <p>In the email we just sent to you, you'll find a link to complete the account setup.</p>
          <a href="${link}" class="verify-link" target="_blank">Verify Your Email</a>
          <p>If you don't see the email in your inbox, please check your spam folder. Sometimes, emails end up there by mistake.</p>
          <p>Thank you for choosing Recurring App. We look forward to serving you and making your experience with us exceptional.</p>
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
    console.log("Email sent successfully: ");
  } else {
    console.error("Failed to send email.");
  }
};

const forgotPasswordResetLink = async (
  email: string,
  resetLink: string
): Promise<void> => {
  const mailResponse = await mailSender(
    email,
    "Email Verification | Forgot Password",
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
    
        .reset-link {
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
          <h1>Forgot Password</h1>
        </div>
        <div class="content">
          <p>Hello User,</p>
          <p>We received a request to reset the password for your account with Recurring App.</p>
          <p>Click on the link below to reset your password. If you didn't request this, you can ignore this email.</p>
          <a href="${resetLink}" class="reset-link" target="_blank">Reset Password</a>
          <p>If you don't see the email in your inbox, please check your spam folder. Sometimes, emails end up there by mistake.</p>
          <p>Thank you for choosing Recurring App. We look forward to continuing to serve you.</p>
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
    console.log("Email sent successfully: ");
  } else {
    console.error("Failed to send email.");
  }
};

export { sendVerificationMail, forgotPasswordResetLink };
