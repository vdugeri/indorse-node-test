const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const username = process.env.MAIL_USER;
const NodeMailer = require('nodemailer');
const password = process.env.MAIL_PASSWORD;
const protocol = process.env.MAIL_PROTOCOL;
const from = process.env.MAIL_FROM;

module.exports = (() => {
  const sendConfirmationEmail = async user => {
    let account = await NodeMailer.createTestAccount();

    let transporter = NodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    let mailOptions = {
      from,
      to: user.email_address,
      subject: 'Authenticator Singup Confirmation',
      text: `Click ${link} to confirm registraion`,
    };

    let info = await transporter.sendMail(mailOptions);

    return {
      id: info.messageId,
      url: NodeMailer.getTestMessageUrl(info)
    }
  }
  return {
    sendConfirmationEmail
  }
})();
