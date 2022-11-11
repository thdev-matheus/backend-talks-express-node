import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/email";
import "dotenv/config";

export const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const transp = await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: text,
    })
    .catch((_) => {
      throw new Error("Internal Server Error"); // mudar pra um AppError
    });

  return true;
};
