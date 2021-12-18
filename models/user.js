// Required dependencies
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passportLocalMongoose = require("passport-local-mongoose");
require('dotenv').config()
const saltValue = 12


const userObject = {
    username: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
        unique: true,
        minlength: 5,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    registerNo: {
        type: String,
        require: true,
    },
    yearofStudy: {
        type: String,
        require: true,
    }
}

const options = {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'lastUpdated',
    },
    strict: 'true',
    collection: 'students'
}

// User Schema definition
var userSchema =
    new mongoose.Schema(userObject, options)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)
