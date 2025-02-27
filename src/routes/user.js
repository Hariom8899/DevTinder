const { authUser } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const express = require('express');
const userRouter = express.Router();

userRouter.get('/user/request/received', authUser, async (req, res) => {
 try{
     const loggedInUser = req.user;
     const requests = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:'interested',
     }).populate("fromUserId", ["firstName", "lastName"]);

     res.json({message:'Data fetched successFully', requests});
    
 }
 catch(err){
    res.status(400).send('Error: ' + err.message);
 }
})

userRouter.get('/user/connections', authUser, async (req, res) => {
  try{
      const loggedInUser = req.user;
      const request = await ConnectionRequest.find({
        $or: [
            {fromUserId: loggedInUser._id, status:"accepted"},
            {toUserId: loggedInUser._id, status:"accepted"},
        ]
      }).populate('fromUserId', ['firstName', 'lastName'])
      .populate('toUserId', ['firstName', 'lastName']);

      const data = request.map((user) => {
        if(loggedInUser._id.toString() === user.fromUserId._id.toString()) return user.toUserId;
        else return user.fromUserId;
    })

      res.json({ data })
  }
  catch(err){

  }
})

module.exports = userRouter;