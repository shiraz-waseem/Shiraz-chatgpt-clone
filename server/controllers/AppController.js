const Chat = require("../models/chat");
const UsersChat = require("../models/userChats")

const AddingChats = async (req, res) => {
    // console.log(req.auth)
    const userId = req.auth.userId;
    const { text } = req.body;

    try {
        // CREATE A NEW CHAT
        const newChat = new Chat({
            userId: userId,
            history: [{
                role: "user",
                parts: [{ text }]
            }]
        })
        const savedChat = await newChat.save();

        // CHECK IF THE USERCHATS EXISTS
        const usersChat = await UsersChat.find({ userId: userId })

        // IF DOESN'T EXIST CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
        if (!usersChat.length) {
            const newUserChats = new UsersChat({
                userId: userId,
                chats: [
                    {
                        _id: savedChat._id,
                        title: text.substring(0, 40),
                    }

                ]
            })
            await newUserChats.save();
        }
        else {
            // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
            await UsersChat.updateOne(
                // first param to find other is to add
                { userId: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 40),
                        },
                    }
                }
            )
        }
        res.status(201).send(newChat._id);   // we will be redirect to that chatId
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating chat!");
    }
}


// fetchUserChats
const fetchAllUserChats = async (req, res) => {
    const userId = req.auth.userId;

    try {
        const userChats = await UsersChat.find({ userId });
        res.status(200).send(userChats[0].chats);

    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching userschat!");
    }
}


const fetchChatMessages = async (req, res) => {
    const userId = req.auth.userId;
    try {
        // userId: userId
        const chat = await Chat.findOne({ _id: req.params.id, userId })
        res.status(200).send(chat);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching chat!");
    }
}


const updateMessages = async (req, res) => {
    const userId = req.auth.userId;
    const { question, answer, img } = req.body;

    const newItems = [
        ... (question ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]   // img:img
            : []
        ),
        { role: "model", parts: [{ text: answer }] },  // question nahi tw answer hi aya from user
    ]

    try {
        const updatedChat = await Chat.updateOne(
            { _id: req.params.id, userId },
            {
                $push: {
                    history: {
                        $each: newItems
                    }
                }
            }
        )
        res.status(200).send(updatedChat);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding conversation!");
    }
}

module.exports = { AddingChats, fetchAllUserChats, fetchChatMessages, updateMessages }