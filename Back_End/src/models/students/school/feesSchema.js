const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    feeName:{
        type:String,
        required: true
    },
    feeAmount:{
        type:Number,
        required:true
    },
    feeDescription:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{timeStamps:true});

const Fees = mongoose.model("Fees", feeSchema);

module.exports=Fees;