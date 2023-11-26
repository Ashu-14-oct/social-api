require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');


module.exports.verifyToken = async (req, res, next) => {
    try{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({message: "You must be logged in!"});
        }

        const token = authorization.replace("Bearer ", "");
        const payload = await jwt.verify(token, process.env.TOKEN);

        const {_id} = payload;
        const user = await User.findById(_id);
        req.user = user;
        next();
    }catch(err){
        return res.status(401).json({message: "unauthorized request"});
    }
}
