const { authUser } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
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
      res.status(400).json({Error: err.message})
  }
})

userRouter.get('/feed', authUser, async (req, res) => {
    try{

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page-1)*limit;
       
       const loggedInUser = req.user;
       const connectionRequest = await ConnectionRequest.find({
        $or:[
          {fromUserId:loggedInUser._id},
          {toUserId: loggedInUser._id},
        ]
       }).select("fromUserId toUserId");
    
      const hideUsersFromFeed = new Set();

      connectionRequest.forEach( (request) => {
        hideUsersFromFeed.add(request.fromUserId.toString());
        hideUsersFromFeed.add(request.toUserId.toString());
      })
        
      const users = await User.find({
        $and:[
          {_id: {$nin: Array.from(hideUsersFromFeed)}},
          {_id: {$ne: loggedInUser._id}},
        ]
      }).select("firstName lastName")
      .skip(skip)
      .limit(limit);
       res.json({data:users});
    }
    catch(err){
        res.status(400).json({Error: err.message})
    }
})

module.exports = userRouter;