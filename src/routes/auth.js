const express = require('express');
const User = require('../models/user');
const { authUser } = require('../middlewares/auth');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt'); // to hash the password

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    try{ 
    //validation of data
    validateSignUpData(req);
  
    const {firstName, lastName, emailId, password } = req.body;
    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
  
    // creating the new Instance of the User Model
    const userInstance = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    })
  
    await userInstance.save();
    res.send('User created SuccessFully!');
    }
    catch(err){
    res.status(400).send('Error Occured During Saving the User in DB:' + err.message);
    }
   
  })
  
authRouter.post('/login', async (req, res) => {
    try{
      const {emailId, password} = req.body;
      const user = await User.findOne({emailId:emailId});
      if(!user){
      throw new Error('Invalid Credentials');
      }
      const isPasswordMatched = await user.isActualPassword(password);
      if(isPasswordMatched){
      const token = await user.getJWT();
      //add the token to cookie and send response back to the user
      res.cookie("token", token, {expires: new Date(Date.now() + 8*3600*1000)});//expire in 8 hrs
      res.send('Login Successfully!!!')
      }
      else{
      throw new Error('Invalid Credentials');
      }
    }
    catch(err){
       res.status(404).send('Error Occured in Login:' + err.message);
    }
  })

authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {expires : new Date(Date.now())});
    res.send('Logout SuccessFully');
})

module.exports = authRouter;