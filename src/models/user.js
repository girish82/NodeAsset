const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;