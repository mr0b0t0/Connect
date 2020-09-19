const composeMessage = require('../utils/composeMessage');

module.exports = async (chat, content, user) => {
    chat.messages.push(composeMessage(content, user));
    await chat.save();
    return chat;
}