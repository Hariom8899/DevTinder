const validator = require('validator');

const validateSignUpData = (req) => {
    const {emailId, password, firstName, lastName} = req.body;
    if(!firstName || !lastName){
        throw new Error('Invalid Name');
    }
    else if(!validator.isEmail(emailId)){
        throw new Error('Invalid EmailId');
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Not a Strong Password");
    }
}

const validateEditRequestData = (req) => {
    const allowedEdits = ["firstName", "lastName", "age", "skills", "aboutMe", "gender",];
    const isValidEditRequest = Object.keys(req.body).every( field => 
         allowedEdits.includes(field)
    )
    console.log(isValidEditRequest);
    return isValidEditRequest;
}

const validatePasswordRequestData = (req) => {
    const isValidPasswordEditRequest = Object.keys(req.body).every( field => 
        field === "password"
   )
   if(!validator.isStrongPassword(req.body["password"])){
    throw new Error('Not a strong password');
   }
   return isValidPasswordEditRequest;
    
}

module.exports = {
    validateSignUpData,
    validateEditRequestData,
    validatePasswordRequestData,
   
}