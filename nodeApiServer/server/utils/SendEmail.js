import nodemailer from 'nodemailer';

export function sendEmail({ emailsTo, subject, html, text }) {

  const transporter = nodemailer.createTransport({
    service: 'Mail.ru',
    port: 465,
    auth: {
      user: 'taskManagerMobileApp@mail.ru',
      pass: 'mobileapp123'
    }
  });

  const mailOptions = {
    from: 'taskManagerMobileApp@mail.ru',
    to: emailsTo,
    subject,
    text,
    html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('send email error:', error);
    }else{
      console.log('Message sent: ' + info);
    };
  });


}
