
const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
//it is middleware to convert the Json data to Js Obj and append it to the request Object
app.use(express.json());

app.post('/signup', async (req, res) => {
  //creating the new Instance of the User Model
  // const userObj = new User({
  //   firstName:"Yuraj Singh",
  //   lastName:"Tiwari",
  //   emailId:"yuvi@134",
  //   password:"abc"
  // })

  const userInstance = new User(req.body);
  console.log(userInstance);
  try{ 
    await userInstance.save();
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

