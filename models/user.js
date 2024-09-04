const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        zipcode:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        accountType:{
            type: String,
            required: true
        },
        schoolName: {
            type: String,
            required: false
        },
        jobTitle: {
            type: String,
            required: false
        },
        specialization:{
            type: String,
            required: false
        }
})

const User = mongoose.model('User', userSchema);
module.exports = User;