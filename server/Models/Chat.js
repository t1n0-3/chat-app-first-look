const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: [String],
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat