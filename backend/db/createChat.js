const Chat = require('../models/Chat');
const {v4} = require('uuid');
const composeMessage = require('../utils/composeMessage');

module.exports = async (chatName, user) => {
    const botName = v4();
    const chat = new Chat({
        chatName,
        messages: [composeMessage(`Welcome to ${chatName}`, botName)],
        users: [botName, user],
        botName
    });
    await chat.save();
    return chat;
}