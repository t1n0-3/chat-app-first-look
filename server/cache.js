const chat = {}

function caches(userId, receiverId, content) {

    let concatedIds = userId + receiverId

    const idChat = concatedIds.split('').sort().join('')

    if (!chat[idChat]) {
        chat[idChat] = []
    }

    const messageData = {
        sender: userId,
        reciever: receiverId,
        content,
    }
    chat[idChat].push(messageData)
    sendToDb(idChat)

}

function sendToDb(idChat) {
    if (chat[idChat].length >= 30) {
        chat[idChat] = []
    }
}


function getCachedData(idChat) {
    if (chat[idChat]) {
        return chat[idChat]
    }

    return []

}
module.exports = { caches, getCachedData };