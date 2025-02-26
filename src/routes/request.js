const { authUser } = require('../middlewares/auth');
const express = require('express');
const requestRouter = express.Router();
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/send/:status/:userId', authUser, async (req, res) => {
  try{
  const status = req.params.status;
  const toUserId = req.params.userId;
  const fromUserId = req.user._id;

  const allowedStatus = ["interested", "ignored"];
  if(!allowedStatus.includes(status)){
    return res.send('Invalid Status');
  }

  const user = await User.findById({_id:toUserId});
  if(!user){
    return res.status(400).json({message: 'No Such User Exists in DB'});
  }
  console.log(user);
  const isRequestAlreadyPresent = await ConnectionRequest.findOne(
    {$or:[
    {fromUserId, toUserId},
    {fromUserId:toUserId, toUserId:fromUserId},]
     })
  if(isRequestAlreadyPresent){
    return res.status(400).json({message:'Request already Exists'});
  }

  const connectionRequest = ConnectionRequest({
    fromUserId,
    toUserId,
    status,
  })
  const data = await connectionRequest.save();
  console.log(user.firstName);
  res.send(req.user.firstName + ' has send the connection request to ' + user.firstName);
}
catch(err){
  res.status(400).send('Error: ' + err.message);
}
})

module.exports = requestRouter;