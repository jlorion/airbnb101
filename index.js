
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./model/listings');

// for put, patch and delete methods
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// layout
const layout = require('express-ejs-layouts');
app.set('layout', 'layouts/layout');
app.use(layout);

// some useful add-ons 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


// database connection
mongoose.connect('mongodb://localhost:27017/ListingsApp')
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })


// path for acces views
const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));

app.use('/listings/:id', (req, res, next) => {
    console.log(req.method, req.body.review)
    next();
})

// homepage
app.get('/', (req, res) => {
    res.render('home');
})


app.get('/listings', async (req, res) => {
    const listings = await Listing.find({});
    res.render('./listings/listings', { listings });
})

app.get('/listings/new', (req, res) => {
    res.render('./listings/new');
})

app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect('/listings');
})


app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/listings/${id}`);
})

app.patch('/listings/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    await Listing.findByIdAndUpdate(id, { $push: { review: req.body } }, { new: true });
    res.redirect(`/listings/${id}`);
})



app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/show', { listing });
})

app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('./listings/edit', { listing });
})

app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.deleteOne({ _id: id });
    res.redirect('/listings');
})

app.get('/about', (req, res) => {
    res.render('about');
})


app.listen(3000, () => {
    console.log("Listening on port 3000.");
})