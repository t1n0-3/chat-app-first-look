const Chat = require("../Models/Chat");

exports.createChat = async (data) => {
    const isExist = await this.getExistedMessage(data.sender, data.receiver)
    if (isExist.length <= 0) {
        Chat.create(data)
    }
    else {
        console.log('chat already exist in data')
    }
}

exports.getExistedMessage = (user1Id, user2Id) => {
    return Chat.find({
        $or: [
            { sender: user1Id, receiver: user2Id },
            { sender: user2Id, receiver: user1Id }
        ]
    }).populate('sender receiver').exec();
}



exports.sendMessage = async (data) => {
    try {

        const populateData = await this.getExistedMessage(data.sender, data.receiver);
        if (data.sender == undefined) { return }

        let timeH = new Date().getHours()
        let timeM = new Date().getMinutes()

        const timeSend = `${timeH}:${timeM}`
        const who = `${data.sender}-${data.content}-${timeSend}`;

        populateData[0].content.push(who);
        await populateData[0].save();

        return "Message updated and saved successfully";
    } catch (error) {
        return "Error occurred while trying to send message";
    }
}
