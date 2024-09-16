const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    title:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    message:{
        type:String,
        required:true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{timestamps: true});


const Circular = mongoose.model('Circular',circularSchema);

module.exports = Circular;