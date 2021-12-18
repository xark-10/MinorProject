var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var resultSchema = new mongoose.Schema({
    studentId: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
        unique: true,
        minlength: 5,
    },
    subject1Id: {
        type: String
    },
    subject2Id: {
        type: String
    },
    subject3Id: {
        type: String
    },
    subject4Id: {
        type: String
    },
    subject5Id: {
        type: String
    },
    subject6Id: {
        type: String
    },
    subject1mark:{
        type: String
    },
    subject2mark: {
        type: String
    },
    subject3mark: {
        type: String
    },
    subject4mark: {
        type: String
    },
    subject5mark: {
        type: String
    },
    subject6mark: {
        type: String
    },
});


const options = {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'lastUpdated',
    },
    strict: 'true',
    collection: 'results'
}

// User Schema definition
var userSchema =
    new mongoose.Schema(resultSchema, options)


module.exports = mongoose.model('Result', userSchema)
