const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:30,
    },
    lastName:{
        type:String,
        maxLength:50,
    },
    emailId:{
        type:String,
        minLength:8,
        maxLength:40,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,//to remove espace from front and end
        validate(value){
            if(!isEmail(value)) {
                throw new Error('Invalid EmailId');
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(pass){
            if(!validator.isStrongPassword(pass)){
                throw new Error('Not an Strong Password');
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female", "Other"].includes(value)){
                  throw new Error('Gender data is not Valid');
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:80,
    },
    aboutMe:{
        type:String,
        default:'I am a developer',
        maxLength:200,
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,//to know the time of createdAt and UpdatedAt
})

const User = mongoose.model("User", userSchema);

module.exports = User;