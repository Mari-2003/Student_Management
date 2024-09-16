const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    }

},{timestamps: true});


const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;