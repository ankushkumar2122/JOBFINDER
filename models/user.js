const { string, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose");

const userSchema= new Schema({
    email: {
        type: String,
        required:true,
        
    },
});

userSchema.plugin(passportlocalmongoose);//automatic username ,password add

module.exports = mongoose.model('User', userSchema);