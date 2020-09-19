module.exports = async (chat, user) => {
    chat.users.push(user);
    await chat.save();
}