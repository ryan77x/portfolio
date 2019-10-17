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
        {name: 'Python'},
        {name: 'C++'},
    ],
    tech_stacks: [
        {name: 'HTML / CSS / Bootstrap / Sass / JSON / SQL'},
        {name: 'DOM API / JQuery'},
        {name: 'React / Redux'},
        {name: 'Express.js / Lookback / Node.js'},
        {name: 'MySQL / MongoDB / Edis'},
        {name: 'RESTful API'},
        {name: 'Mocha / Chai / Nightmare / JUnit / Jasmine / Cypress / Selenium / Robot Framework / Mockserver'},
    ],
    dev_tools: [
        {name: 'GIT / Github'},
        {name: 'Visual studio code / Eclipse'},
        {name: 'Postman'},
        {name: 'Chrome dev tool'},
        {name: 'Jenkins / CircleCI'},
        {name: 'Heroku / Azure / AWS'},
    ],
};

const myProjects = {
    webProjects: [
        {name: 'Creating Coding Careers', github: '', heroku: 'https://www.creatingcodingcareers.org'},
        {name: 'Movie finder app', github: 'https://github.com/ryan77x/react200-movie-finder', heroku: 'https://rl-react200-movie-finder.herokuapp.com/'},
        {name: 'Weather app', github: 'https://github.com/ryan77x/react200-weather-app', heroku: 'https://rl-react200-weather-app.herokuapp.com/'},
        {name: 'Very simple todo app', github: 'https://github.com/ryan77x/react100-vstda', heroku: 'https://rl-react100-vstda.herokuapp.com/'},
        {name: 'Web APIs Hackathon', github: 'https://github.com/ryan77x/hackathon', heroku: 'https://rl-hackathon1.herokuapp.com/'},
    ],
    desktopProjects: [
        {name: 'Media Inventory', github: 'https://github.com/ryan77x/media-inventory', screenshots: ''},
        {name: 'Knock Knock chat', github: 'https://github.com/ryan77x/knock-knock-chat', screenshots: ''},
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
