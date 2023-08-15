import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "infatorkeh@gmail.com",
      pass: "jvdbnnpigzkbfuuj",
    },
  });
  const mailOptions = {
    from: "infatorkeh@gmail.com",
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
