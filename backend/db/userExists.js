module.exports = (chat, user) => {
    return chat.users.indexOf(user) !== -1;
}