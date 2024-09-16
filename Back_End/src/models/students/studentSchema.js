const mongoose = require('mongoose');

const genders = ["Male","Female"]

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:genders 
    },
    rollNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
   address:{
    type: String,
    required:true
   },
    password:{
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
    },

},{timestamps: true});


const Student = mongoose.model('Student',studentSchema);

module.exports = Student;