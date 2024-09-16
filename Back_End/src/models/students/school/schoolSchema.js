const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    schoolName:{
        type:String,
        required:true
    },
    telephoneNumber:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps: true});

const School = mongoose.model("School", schoolSchema);
module.exports = School;