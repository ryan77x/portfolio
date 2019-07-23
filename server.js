const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//var profile = require('./profile');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

const msg = {
    to: 'ryan8x@gmail.com',
    from: '',
    subject: 'Contact from my portfolio webpage',
    text: '',
    html: '',
};

app.use(morgan('dev'));
//app.use('profile', profile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Ryan',
            lastName: 'Liang',
        }
    };

    res.render('index', data);
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.post('/thanks', (req, res) => {
    let contact = req.body;
    let text = "Name: " + contact.firstName + " " + contact.lastName + "    Email: " + contact.email;
    let html = "<strong>Name: </strong>" + contact.firstName + " " + contact.lastName + "<br><strong>Email: </strong>" + contact.email;

    msg.from = contact.email;
    msg.text = text;
    msg.html = html;

    sgMail.send(msg)
    .catch(err => {
        console.log(err);
    });

    res.render('thanks.ejs', { contact: contact })
});

app.get('*', function (req, res) {
    res.send('Page not found 404').status(404);
  })

app.listen(3000, () => {
    console.log('Listening at http://localhost:3000');
});

