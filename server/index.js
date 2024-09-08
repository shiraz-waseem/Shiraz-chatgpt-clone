const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
require("./db/conn");
const appRoute = require("./routes/AppRoute");
const ImageKit = require('imagekit');

const cors = require("cors");
const PORT = 8000;

app.use(express.json()); // to parse req.body
app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});


app.get('/api/upload', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});





app.use("", appRoute)

app.listen(PORT, () => {
  console.log(`listening to port no ${PORT}`);
});