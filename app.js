console.log('Welcome to Home Page');
const express = require('express');
const app = express();

app.get('/home',(req, res) => {
    console.log(req.url);
    res.send('Welcome to Home Page');
})

app.get('/about', (req, res) => {
    console.log(req.url);
    res.send('About Us Page');
})

app.listen(3000, () => console.log('Server Listening at Port 3000'));