const mongoose = require('mongoose');
const {v4} = require('uuid');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    id: {type: 'String', default: v4},
    user: {type: 'String', required: true},
    content: {type: 'String', required: true},
    date: {type: 'Date', default: Date.now},
});

const chatSchema = new Schema({
    chatName: {type: 'String', required: true, unique: true},
    users: [{type: 'String'}],
    messages: [messageSchema],
    botName: {type: 'String'}
}, {collection: 'chatsRooms'});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
