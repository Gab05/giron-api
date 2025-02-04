import nodemailer from "nodemailer";
import { SubmissionRequest } from "../handler/soumission";

const user = "gabriel.laliberte.96@gmail.com";
const pass = Buffer.from("dHZxayBwdWR4IGJ3Y3ggeGtkYw==", 'base64').toString('utf8');
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

const sendSubmissionEmail = async (request: SubmissionRequest) => {
    const mailOptions = {
        from: user,
        to: "info@gironentrepreneur.com",
        subject: `Nouvelle demande - ${request.firstName} ${request.lastName}`,
        text: buildText(request),
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
}

const buildText = (request: SubmissionRequest) =>
    `Nouvelle demande de soumission ou d'information provenant du site web de la part de ${request.firstName} ${request.lastName}:\n\n${request.message}\n\n=====\nAutres Informations:\n\nTel: ${request.phone}\nEmail: ${request.email}\nAddresse (optionnel): ${request.address || "-"}\nVille (optionnel): ${request.city || "-"}\nCode Postal (optionnel): ${request.postalCode || "-"}`;

export { sendSubmissionEmail };
