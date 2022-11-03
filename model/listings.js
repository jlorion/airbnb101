const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    review: {
        type: Number,
        default: 0,
        max: 5
    }, 
    image: String,
    location: String,  
    description: String,
    lng: Number,
    lat: Number
})

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

