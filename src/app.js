
const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
  const userObj = new User({
    firstName:"Hariom",
    lastName:"Tiwari",
    emailId:"hariom@134",
    password:"abc"
  })
  await User.save;
  res.send('User created SuccessFully!');
})

connectDB().then(() => {
console.log('Connnection Established SuccessFully');
app.listen(8080, () => console.log('Server Listening at Port 8080'));
})
.catch((err) =>{
console.log('Error Occured During DB Connection ' + err.message);
})

