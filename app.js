require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoConnection = require('./config/mongoose');
const cors = require('cors');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routing
app.use('/', require('./routes/index'));
app.use('/api/v1', require('./routes/userRoutes'))

//listening
app.listen(PORT, (err) => {
    if(err){
        console.log("error is :",err);
        return;
    }
    console.log(`server running on port ${PORT}`);
});