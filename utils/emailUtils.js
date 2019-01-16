const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const username = process.env.MAIL_USER;
const NodeMailer = require('nodemailer');
const password = process.env.MAIL_PASSWORD;
const protocol = process.env.MAIL_PROTOCOL;
const from = process.env.MAIL_FROM;


const sendConfirmationEmail = user => {
    console.log('confirmation email sent');
}

module.exports = {
    sendConfirmationEmail
}
