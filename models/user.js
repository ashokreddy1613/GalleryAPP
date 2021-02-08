const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require ('md5');
const validator = require('validator');


const userSchema = new Schema ({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Adress'],
        required: 'Please provide an email address'
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)