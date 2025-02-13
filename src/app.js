console.log('Welcome to Home Page');
const express = require('express');
const app = express();


//this will only handle http get request 
app.get('/home',(req, res) => {
    console.log(req.url);
    res.send('Welcome to Home Page');
})

//this will handles all http request with /test route
app.use('/test', (req, res) => {
    res.send('Test Success');
})



app.get('/user', (req, res) => {
    res.send({firstName:"hariom", lastName:"Tiwari"});
})

app.post('/user', (req, res) => {
    res.send('Data Saved in DB Successfully');
})

app.delete('/user', (req, res) => {
    res.send('Data is Deleted SuccessFully');
})

app.listen(3000, () => console.log('Server Listening at Port 3000'));