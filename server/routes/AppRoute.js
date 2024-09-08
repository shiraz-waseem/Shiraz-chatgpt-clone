const express = require("express");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const router = express()

const {
  AddingChats, fetchAllUserChats, fetchChatMessages, updateMessages
} = require("../controllers/AppController")


router.post("/api/chats", ClerkExpressRequireAuth(), AddingChats);
router.get("/api/userchats", ClerkExpressRequireAuth(), fetchAllUserChats);
router.get("/api/chats/:id", ClerkExpressRequireAuth(), fetchChatMessages);
router.put("/api/chats/:id", ClerkExpressRequireAuth(), updateMessages);

module.exports = router;