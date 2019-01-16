const HOST = process.env.HOST;
const PORT = process.env.PORT;
const username = process.env.MAIL_USER;
const NodeMailer = require('nodemailer');
const from = process.env.MAIL_FROM;
const API_VERSION = process.env.API_VERSION;

module.exports = (() => {
  const sendConfirmationEmail = async recipient => {
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

    const link = `http://${HOST}:${PORT}/api/${API_VERSION}/emails/verify?token=${recipient.remember_token}`

    let mailOptions = {
      from,
      to: recipient.email_address,
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
