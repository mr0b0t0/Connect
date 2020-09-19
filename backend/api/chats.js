const express = require('express');

const findChat =  require('../db/findChat');
const Chat = require('../models/Chat');

const router = express.Router();

router.get('/get_chats', async (_, res) => {
    const chats = await Chat.find({});
    return res.json({chatNames: chats.map(chat => chat.chatName)});
});

router.get('/get_chat/:chatName', async (req, res) => {
    const {chatName} = req.params;
    if(!chatName) return res.sendStatus(400);
    const chat = await findChat(chatName);
    return res.json({chat});
});

module.exports = router;