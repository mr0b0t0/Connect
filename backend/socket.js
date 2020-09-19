const addUser =  require('./db/addUser');
const createChat =  require('./db/createChat');
const findChat =  require('./db/findChat');
const userExists =  require('./db/userExists');
const pushMessage =  require('./db/pushMessage');

const findChatIndex = (chats, chatName) => chats.findIndex(c => c.chatName === chatName);
const initChat = (chatName, firstUser) => ({chatName, users: [firstUser]});
// const userIndex = (chat, user) => chat.users.findIndex(u => u === user);
const removeUser = (chat, user) => {
    chat.users = chat.users.filter(u => u !== user);
    return chat;
}
const pushUser = (chat, user) => [user, ...chat.users];


module.exports = io => {
    let chats = [];
    io.on("connection", async socket => {
        socket.on('connectUser', async ({chatName, user}) => {
            try{
                let chat = await findChat(chatName);
                if(!chat) chat = await createChat(chatName, user);
                else if(chat && !userExists(chat, user)) await addUser(chat, user);
                chat = await pushMessage(chat, `${user} has joined the chat`, chat.botName);
                socket.join(chat.chatName);
                const chatIndex = findChatIndex(chats, chat.chatName);
                if(chatIndex === -1) chats.push(initChat(chat.chatName, user));
                else {
                    chats[chatIndex] = pushUser(chats[chatIndex], user);
                    io.to(chat.chatName).emit('chatUpdate', {chat});
                }
                socket.emit('chatInfo', {chat, user});
            }catch(err){
                socket.emit('formError');
                throw(err);
            }
        });
        socket.on('message', async ({chatName, user, content}) => {
            let chat = await findChat(chatName);
            if(chat){
                chat = await pushMessage(chat, content, user);
                socket.join(chat.chatName);
                io.in(chat.chatName).emit('chatUpdate', {chat});
            }
        });
        socket.on('leaveChat', async ({chatName, user}) => {
            let chat = await findChat(chatName);
            if(chat){
                chat = await pushMessage(chat, `${user} has left the chat`, chat.botName);
                socket.join(chat.chatName);
                const chatIndex = findChatIndex(chats, chat.chatName);
                if(chatIndex !== -1) chats[chatIndex] = removeUser(chats[chatIndex], user);
                io.to(chat.chatName).emit('chatUpdate', {chat});
            }
        });
    });
}
