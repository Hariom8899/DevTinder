const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) =>{
    try{
    const {token} = req.cookies;
    const  decodedValue = await jwt.verify(token, "DevTinder");
    const {_id} = decodedValue;
    if(!_id){
        throw new Error('Invalid Token');
    }
    const user = await User.findById({_id:_id});
    console.log(user);
    if(!user){
        throw new Error("No User Exists with the provided token");
    }
    req.user = user;
    next();
}
catch(err){
    res.status(400).send('UserAuth: ' + err.message);
}
}

module.exports = { authUser };