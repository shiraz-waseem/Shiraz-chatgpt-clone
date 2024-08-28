const express = require("express");

const router = express()

const {
  testController
} = require("../controllers/AppController")


router.get("/", testController);

module.exports = router;