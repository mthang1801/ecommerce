const nodemailer = require("nodemailer");

const sendEmail = (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PWD,
    },
  });
  let options = {
    from: "Ecommerce Shopping For Fun <support@ecommerce.com>",
    to,
    subject,
    html,
  };
  return transporter.sendMail(options);
};

module.exports = sendEmail;
