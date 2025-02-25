const { authUser } = require('../middlewares/auth');
const express = require('express');
const { validateEditRequestData, validatePasswordRequestData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validator = require('validator');
const profileRouter = express.Router();

profileRouter.get('/profile/view', authUser, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
      res.status(404).send('Error Occured in getting Profile:' + err.message);
    }
  })

profileRouter.patch('/profile/edit', authUser, async (req, res) => {
    try{
        if(!validateEditRequestData(req)){
            throw new Error('Invalid Edit Request');
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach( (key) =>{
            loggedInUser[key] = req.body[key];
        })
        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName} edited Succesfully`,
        data: loggedInUser});
    }
    catch(err){
      res.status(404).send('Error Occured in Editing Profile:' + err.message);
    }
  })

profileRouter.patch('/profile/password', authUser, async (req, res) => {
   try{
    if(!validatePasswordRequestData(req)){
      throw new Error('Invalid Password Edit Request');
  }
  const loggedInUser = req.user;
  const passwordHash = await bcrypt.hash(req.body["password"], 10);
  Object.keys(req.body).forEach((key) =>{
  loggedInUser[key] = passwordHash}
  )
  
  await loggedInUser.save();
  res.send(`${loggedInUser.firstName} password edited succesfully`);
   }
   catch(err){
    res.status(404).send('Error Occured in Editing Password:' + err.message);
   }
})

module.exports = profileRouter;