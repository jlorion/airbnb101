const mongoose = require('mongoose');
const Listing = require('./model/listings');


mongoose.connect('mongodb://localhost:27017/ListingsApp')
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const listingItems = [
    {
        name: "House1",
        price: 20000,
        location: "Davao City"
    },
    {
        name: "House2",
        price: 50000,
        location: "Manila City"
    },
    {
        name: "House3",
        price: 30000,
        location: "Cebu City"
    },
    {
        name: "House4",
        price: 40000,
        location: "Cotabato City"
    }
]

Listing.insertMany(listingItems);