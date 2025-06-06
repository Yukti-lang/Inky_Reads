const mongoose = require('mongoose');
const book = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    }
},
{timestamps: true}
); //kis user ne order kiya h 
module.exports = mongoose.model('books', book);