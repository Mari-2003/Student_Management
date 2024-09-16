const mongoose = require('mongoose');
const Payment = require('../Payment/paymentSchema');

const studentFeeSchema = new mongoose.Schema({
    enrollmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment',
        required: true
    },
    feeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fees',
        required: true
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
},{timestamps: true});

const StudentFee = mongoose.model("StudentFee",studentFeeSchema);
module.exports = StudentFee;