const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//var profile = require('./profile');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

const myData = {
    person: [
        {firstName: 'Ryan'},
        {lastName: 'Liang'},
    ],
    coding_languages: [
        {name: 'JavaScript'},
        {name: 'Java'},
    ],
    tech_stacks: [
        {name: 'HTML / CSS / Bootstrap'},
        {name: 'DOM API / JQuery'},
        {name: 'React'},
        {name: 'ExpressJS'},
        {name: 'MySQL / MongoDB / Edis'},
        {name: 'RESTful API'},
        {name: 'Unit level and end-to-end testing (Mocha / Chai / Nightmare)'},
    ],
    dev_tools: [
        {name: 'GIT'},
        {name: 'Visual studio code'},
        {name: 'Eclipse'},
        {name: 'Postman'},
        {name: 'Chrome dev tool'},
    ],
};

const myProjects = {
    webProjects: [
        {name: 'Web APIs Hackathon', github: 'https://github.com/ryan77x/hackathon', heroku: 'https://rl-hackathon1.herokuapp.com/'},
        {name: 'Very simple todo app', github: 'https://github.com/ryan77x/react100-vstda', heroku: 'https://rl-react100-vstda.herokuapp.com/'},
        {name: 'Change calculator', github: 'https://github.com/ryan77x/react100-change-calculator', heroku: 'https://rl-react100-change-calculator.herokuapp.com/'},
        {name: 'Mortgage calculator', github: 'https://github.com/ryan77x/react100-mortgage-calculator', heroku: 'https://rl-react-mortgage-calculator.herokuapp.com/'},
    ],
    desktopProjects: [
        {name: 'Media store', github: 'https://github.com/ryan77x/hackathon', screenshots: ''},
    ]
};

const msg = {
    to: 'ryan8x@gmail.com',
    from: '',
    subject: 'Contact from my portfolio webpage',
    text: '',
    html: '',
};

app.use(morgan('dev'));
app.use(express.static('public'));
//app.use('profile', profile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', myData);
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.get('/resume', (req, res) => {
    res.render('resume.ejs');
});

app.get('/projects', (req, res) => {
    res.render('projects.ejs', myProjects);
});

app.post('/thanks', (req, res) => {
    let contact = req.body;
    let text = "Name: " + contact.firstName + " " + contact.lastName + "    Email: " + contact.email + "<br>" + contact.message;
    let html = "<strong>Name: </strong>" + contact.firstName + " " + contact.lastName + "<br><strong>Email: </strong>" + contact.email + "<br><strong>Message: </strong>" + contact.message;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
