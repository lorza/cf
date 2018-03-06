const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const roundSchema = mongoose.Schema({
    createdAt: {
        type: Date, 
        default: Date.now, 
        required: true, 
    },
    deposits: [],
})

module.exports = mongoose.model("Round", roundSchema);