let chat = {}
export default function caches(roomId, cachedData, currentMessageData) {
    let result = []
    if (!chat[roomId]) {
        chat[roomId] = []
    }
    result = cachedData
    result.push(currentMessageData)
    chat[roomId] = result
    return chat[roomId]
}
