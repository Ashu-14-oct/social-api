require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoConnection = require('./config/mongoose');

const app = express();

//routing
app.use('/', require('./routes/index'));

//listening
app.listen(PORT, (err) => {
    if(err){
        console.log("error is :",err);
        return;
    }
    console.log(`server running on port ${PORT}`);
});