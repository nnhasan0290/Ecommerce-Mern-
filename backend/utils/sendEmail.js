const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "nazmulhasan0290@gmail.com",
      pass: "ezgbptxtwnipdipy",
    },
  });

  const mailOptions = {
    from: "nazmulhasan0290@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
