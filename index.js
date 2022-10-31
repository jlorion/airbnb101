
const express = require('express');
const app = express();

const layout = require('express-ejs-layouts');
app.set('layout', 'layouts/layout');
app.use(layout);


app.set('view engine', 'ejs');
app.use(express.json());

// path for acces views
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));


// homepage
app.get('/', (req, res) => {
    res.render('home');
})


app.get('/listings', (req, res)=> {
    res.render('listings');
})

app.get('/about', (req, res) => {
    res.render('about');
})








app.listen(3000, () => {
    console.log("Listening on port 3000.");
})