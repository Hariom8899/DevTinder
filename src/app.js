
const express = require('express');
const app = express();
const {authAdmin, authUser} = require('./middlewares/auth');

app.use('/admin', authAdmin);


app.get('/admin/allData', (req, res, next) => {
    res.send('Data is Sent');
})

app.get('/admin/deleteUser', (req, res, next) => {
    res.send('user Deleted');
})

//dynamic route
// app.get('/user/:id/:name', (req,res) => {
//     res.send(req.params);
// })

// //Middlewares
// app.use('/user',(req, res, next) => {
// console.log('First Handler');
// next();
// },

// (req, res, next) => {
//     console.log('Second Handler');
//     next();
// },

// (req, res, next) => {
//     console.log('Third Handler');
//     res.send('Response 3');
// }
// )


// //this will only handle http get request 
// app.get('/home',(req, res) => {
//     console.log(req.url);
//     res.send('Welcome to Home Page');
// })

// //this will handles all http request with /test route
// app.get('/test', (err, req, res, next) => {
//     if(err) res.status(401).send('Something went wrong');
//     // throw new Error('Error Occured');
//     res.send('Test Success');
// })

app.get('/user', authUser, (req, res) => {
    res.send({firstName:"hariom", lastName:"Tiwari"});
})


// app.post('/user', (req, res) => {
//     res.send('Data Saved in DB Successfully');
// })

// app.delete('/user', (req, res) => {
//     res.send('Data is Deleted SuccessFully');
// })

app.listen(3000, () => console.log('Server Listening at Port 3000'));