const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ryan8x@gmail.com',
  from: 'ryan7x7x@gmail.com',
  subject: 'Contact from my portfolio webpage',
  text: 'Contact from my portfolio webpage',
  html: '<strong>Contact from my portfolio webpage</strong>',
};

sgMail.send(msg)
.catch(err => {
    console.log(err);
});