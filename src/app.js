const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const { authUser } = require('./middlewares/auth');
const app = express();
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const cookieParser = require('cookie-parser'); //to read the cookies data


//it is middleware to convert the Json data to Js Obj and append it to the request Object
app.use(express.json());
//to read the cookie data if not applied it will be undefined
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);


connectDB().then(() => {
console.log('Connnection Established SuccessFully');
app.listen(7777, () => console.log('Server Listening at Port 7777'));
})
.catch((err) =>{
console.log('Error Occured During DB Connection ' + err.message);
})

