
const express = require('express');
const connectDB = require('./config/database');
const { authUser } = require('./middlewares/auth');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt'); // to hash the password
const cookieParser = require('cookie-parser'); //to read the cookies data
const jwt = require('jsonwebtoken') //to create jwt token
const app = express();
//it is middleware to convert the Json data to Js Obj and append it to the request Object
app.use(express.json());
//to read the cookie data if not applied it will be undefined
app.use(cookieParser());

app.post('/signup', async (req, res) => {
  try{ 
  //validation of data
  validateSignUpData(req);

  const {firstName, lastName, emailId, password } = req.body;
  //encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

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

app.post('/login', async (req,res) => {
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

app.get('/profile', authUser, async (req, res) => {
  try{
      const user = req.user;
      res.send(user);
  }
  catch(err){
    res.status(404).send('Error Occured in getting Profile:' + err.message);
  }
})

app.post('/sendConnectionRequest', authUser, async (req, res) => {
  res.send(req.user.firstName + '  has send the connection request');
})

app.get('/user', async (req, res) => {
  const emailId = req.body.emailId;
  const users = await User.find({emailId:emailId});
  try{
    if(users.length==0){
      res.send('No Such User Exists with the given Record');
    }
     else res.send(users);
  }catch(err){
    res.status(400).send('Error Occured During getting the User' + err.message);
  }
})

app.get('/feed', async (req, res) => {
// {} to get all the users of Model
  const users = await User.find({});
  try{
    res.send(users);
  }
  catch(err){
    res.status(400).send('Error Occured in Feed' + err.message);
  }
})

app.delete('/user', async (req, res) => {
  const id = req.body._id;
  try{
  // const result = await User.findByIdAndDelete({_id:id});
  const result = await User.findByIdAndDelete(id);
    res.send("User Deleted SuccessFully!");
  }catch(err){
    res.status(400).send('Error Occured During Deletion: ' + err.message);
  }
})

app.patch('/user/:id', async (req, res) => {
  const _id = req.params?.id;
  try{
    const ALLOWED_UPDATES = ["age", "skills", "firstName", "lastName", "gender", "aboutMe"];
    const isAllwedUpdates = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k));
    if(!isAllwedUpdates) {
      throw new Error('U are violating the update constraints');
    }
    if(req.body?.skills.length>10){
      throw new Error('Skills Can not be more than 10');
    }

    const result = await User.findByIdAndUpdate({_id:_id}, req.body, {
    returnDocument:"after",
    runValidators:true
  });
    res.send('User Updated Successfully!!');

  }catch(err){
    res.status(400).send('Error Occured During User Updation:' + err.message);
  }
})

connectDB().then(() => {
console.log('Connnection Established SuccessFully');
app.listen(7777, () => console.log('Server Listening at Port 7777'));
})
.catch((err) =>{
console.log('Error Occured During DB Connection ' + err.message);
})

