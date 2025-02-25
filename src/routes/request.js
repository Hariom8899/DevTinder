const { authUser } = require('../middlewares/auth');
const express = require('express');
const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest', authUser, async (req, res) => {
    res.send(req.user.firstName + '  has send the connection request');
  })

module.exports = requestRouter;