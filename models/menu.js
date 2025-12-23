const mongoose = require('mongoose');

//Define Menu Schema
const menuSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['Sweet', 'Sour', 'Salty', 'Bitter', 'Umami'],
    },
    is_drink: {
        type: Boolean,
        required: true,
        default: false
    },
    ingredients: {
        type: [String]
    },
    num_sales: {
        type: Number,
        detault: 0
    }
});

const MenuItem = mongoose.model('MenuItem', menuSchema);
module.exports = MenuItem;