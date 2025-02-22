const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
//didn't use arrow function here as it will behaves differently with the this keyword
//here this refers to the instance of the schema
userSchema.methods.getJWT =  async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id}, "DevTinder", {expiresIn:"1d"});//expires in 1day
    return token;
}

userSchema.methods.isActualPassword = async function(passwordProvidedAsInput) { 
    const user = this;
    const isMatched = await bcrypt.compare(passwordProvidedAsInput, user.password);
    return isMatched;
}

const User = mongoose.model("User", userSchema);

module.exports = User;