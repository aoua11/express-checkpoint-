const express = require('express');
const app = express();



const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); 
    const hour = date.getHours();


    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9am to 5pm).');
    }
};


app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('home');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact');
});

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:3001}`);
});

