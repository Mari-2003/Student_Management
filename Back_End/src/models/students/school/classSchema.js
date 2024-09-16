const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className:{
        type:Number
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps: true});


const Class = mongoose.model('Class',classSchema);

module.exports = Class;