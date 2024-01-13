const express = require('express')
const io = require('socket.io')(3001)
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { Register, login } = require('./Service/userService');
const { getFriends } = require('./Service/friendsService');
const { sendMessage, createChat } = require('./Service/chatService');
const { caches, getCachedData } = require('./cache');

const app = express()
const DB_URL = 'mongodb://127.0.0.1:27017/SocialNetwork'

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connection with DB successful...');
    })
    .catch(err => console.error('Connection error:', err));



io.on('connection', (socket) => {

    socket.on('onJoinRoom', async roomId => {
        try {
            socket.join(roomId)
            const cachedData = getCachedData(roomId)
            socket.emit('recieve_cache', cachedData)
            console.log('seccessfuly join room')
        } catch (err) {
            console.log('unseccessfuly join room')
        }
    })

    socket.on('send_messages', async (data) => {
        // await sendMessage(data)
        socket.join(data.room)
        console.log(data)
        caches(data.sender, data.receiver, data.content, data.room)
        socket.to(data.room).emit('receive_message', data)
    })
})

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        await Register(req.body)
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { userId } = req.body
        const data = await getFriends(userId)
        const friends = data.filter(x => x._id != userId)
        res.status(200).json({ friends });
    } catch (err) {
        res.status(404).json('cant get friends')
    }
})
app.post('/onChat', async (req, res) => {
    await createChat(req.body)
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const response = await login(email, password)
        console.log('da')
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred' });
    }
})
app.listen(3000, () => console.log('server is listening...'))