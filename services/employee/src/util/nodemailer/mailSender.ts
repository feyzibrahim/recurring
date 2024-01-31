import nodemailer from "nodemailer";

interface MailSenderInfo {
  messageId: string;
  response: string;
}

const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<MailSenderInfo | undefined> => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "",
      auth: {
        user: process.env.MAIL_USER || "",
        pass: process.env.MAIL_PASS || "",
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: "Recurring - Email Verification",
      to: email,
      subject: title,
      html: body,
    });

    return {
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error: any) {
    console.error(error.message);
    return undefined;
  }
};

export default mailSender;
