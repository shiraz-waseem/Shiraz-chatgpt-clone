const mongoose = require("mongoose")

// each chat has a userId and history which include messages. Inside each message we will pass roles and parts as docs say. Inside the parts we have a text this role will be either user or model
// const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hi my name is Bob" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Hi Bob!" }],
//       },
//     ],
//    
//   });

const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    history: [
        {
            role: {
                type: String,
                enum: ['user', 'model'],
                required: true
            },
            parts: [{
                text: {
                    type: String,
                    required: true
                }
            }],
            img: {
                type: String,
                required: false,
            },
        }
    ]
}, { timestamps: true })


const chat = mongoose.model("Chat", chatSchema);
module.exports = chat;