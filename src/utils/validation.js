const validator = require('validator');

function validateSignUpData(req){
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

module.exports = {
    validateSignUpData,
}