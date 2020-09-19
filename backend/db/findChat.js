const Chat = require('../models/Chat');

module.exports = async chatName => {
    const chat = await Chat.findOne({chatName});
    return chat;
}