const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    totalAmount:{
        type:Number,
        required: true
    },
    balanceAmount:{
        type:Number,
        required: true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;