require("dotenv").config();
const mongoose = require("mongoose");

 const mongoConnection= mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoConnection