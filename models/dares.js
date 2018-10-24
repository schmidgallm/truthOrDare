// Dependencies
const mongoose = require('mongoose');

// Save ref to to schema constructor
const Schema = mongoose.Schema;

const DareSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bounty: {
        type: Number,
        required: true
    },
    boardname: {
        type: String,
        required: true
    },
    claimed: {
        type: Boolean,
        default: false
    }
});

const Dares = mongoose.model('contact', DareSchema);

module.exports = Dares;