
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
    res.status(400).send('Error Occured During Saving the User in DB:' + err.message);
  }
 
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

app.patch('/user', async (req, res) => {
  const _id = req.body.id;
  try{
    const result = await User.findByIdAndUpdate({_id:_id}, req.body, {returnDocument:"after"});
    res.send(result);

  }catch(err){
    res.status(400).send('Erro Occured During User Updation:' + err.message);
  }
})

connectDB().then(() => {
console.log('Connnection Established SuccessFully');
app.listen(7777, () => console.log('Server Listening at Port 7777'));
})
.catch((err) =>{
console.log('Error Occured During DB Connection ' + err.message);
})

