const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
        courseName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description:{
            type: String,
            required: true
        }
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;