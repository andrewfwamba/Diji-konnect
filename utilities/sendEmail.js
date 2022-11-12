const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.google.com",
      service: "gmail",
      port: 587,
      // secure: false,
      auth: {
        // create random accounts here
        // user: testAccount.user,
        // pass: testAccount.pass,
        user: "testingdeveloperke@gmail.com",
        pass: "Fwamba001.",
        // type: "OAuth2",
        // user: process.env.MAIL_USERNAME,
        // pass: process.env.MAIL_PASSWORD,
        // clientId: process.env.CLIENT_ID,
        // clientSecret: process.env.CLIENT_SECRET,
        // refreshToken: process.env.REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    await transporter.sendMail({
      from: '"Dijikonnect" <testingdeveloperke@gmail.com>',
      to: email,
      subject: "Password reset key",
      text: "Here is your Password reset Token",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error, "Email not sent");
  }
};
