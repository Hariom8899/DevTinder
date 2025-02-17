
const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
  const userObj = new User({
    firstName:"Yuraj Singh",
    lastName:"Tiwari",
    emailId:"yuvi@134",
    password:"abc"
  })
  try{ 
    await userObj.save();
    res.send('User created SuccessFully!');
  }catch(err){
    res.status(400).send('Error Occured During Saving the User in DB ');
  }
 
})

connectDB().then(() => {
console.log('Connnection Established SuccessFully');
app.listen(7777, () => console.log('Server Listening at Port 7777'));
})
.catch((err) =>{
console.log('Error Occured During DB Connection ' + err.message);
})

