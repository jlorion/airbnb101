const mongoose = require('mongoose');



const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    review: [{
        rating: {
            type: Number,
            min: 0,
            max: 5,
            require: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    image: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: "City not defined!"
    },
    description: {
        type: String,
        default: " "
    },
    lng: {
        type: Number,
        default: 0
    },
    lat: {
        type: Number,
        default: 0
    }
})

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

