const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values: ["interested", "reject", "accept", "ignore"],
            message:`{VALUE} is incorrect Status `,
        },
        required:true,
    }
},
{
    timestamps:true,
})

// Compound Index -> to search fast as it uses indexing as here it is sorting in ascending
connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", function (next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('You can not send request to yourself');
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;