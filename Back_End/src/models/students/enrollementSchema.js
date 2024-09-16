const mongoose = require('mongoose');

// Define the Enrollment schema
const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    }
},{timestamps: true});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
