const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
    enrollmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: true
    },
    circularId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circular',
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const CircularSub = mongoose.model('Circular_Sub', circularSchema);

module.exports = CircularSub;
