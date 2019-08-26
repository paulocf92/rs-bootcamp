import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    // a transport is used for sending mails
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    // add our config on top of existing config, and attach message
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
