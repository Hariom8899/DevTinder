const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
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
        type:Number
    },
    aboutMe:{
        type:String,
        default:'I am a developer',
    },
    skills:{
        type:[String],
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;