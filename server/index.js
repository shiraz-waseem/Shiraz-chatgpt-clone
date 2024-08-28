const express = require("express");
const app = express();
require("./db/conn");
const appRoute = require("./routes/AppRoute");

const cors = require("cors");
const PORT = 8000;

app.use(express.json()); // to parse req.body
app.use("",appRoute)

app.listen(PORT, () => {
    console.log(`listening to port no ${PORT}`);
  });