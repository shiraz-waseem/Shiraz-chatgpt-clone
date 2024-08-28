

const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();


mongoose
  .connect("mongodb+srv://shirazwaseem321:n3lMhEkVJOA3kRhs@cluster0.d8g93.mongodb.net/GeminiApp?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connection successfully");
  })
  .catch((e) => {
    console.log(e);
  });