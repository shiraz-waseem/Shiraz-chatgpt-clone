const mongoose = require("mongoose")


// using our user id we will fetch the chats
const userChatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    chats: [
        {
            _id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
},
    { timestamps: true }
)


const userChats = mongoose.model("UserChat", userChatsSchema);
module.exports = userChats;