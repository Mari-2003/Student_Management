const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String
    },
    isActive: {
        type:Boolean,
        default:false
    }

},{timestamps: true});

const Section = mongoose.model('Section',sectionSchema);

module.exports = Section;