import './Chat.css'

import { useContext, useEffect, useState } from 'react'

import { authContext } from '../context/authContext';
import caches from '../utils/cache';

export default function Chat({ cachedData, setCurrentMessages, receiverId }) {
    const { auth, socket } = useContext(authContext)
    const [message, setMessage] = useState('')

    const user = auth._id ? auth._id : JSON.parse(auth)._id
    function sendMessage(e) {
        const idChat = user + e.currentTarget.id;
        const room = idChat.split('').sort().join('')
        const messageData = {
            sender: user,
            content: message,
            receiver: e.currentTarget.id,
            room
        }
        setCurrentMessages(x => [...x, messageData])

        socket.emit('send_messages', messageData)
    }
    return (<>
        <div className="chat-container">
            {cachedData.length > 0 ? cachedData.map((x, i) =>
                x.sender == user ?
                    <div key={i} className="message me">
                        <div className="message-text">{x?.content}</div>
                        <div className="message-info">
                            <span className='my_name'>{x?.sender}</span>
                            <span>12:34 PM</span>
                        </div>
                    </div>
                    :
                    <div key={i} className="message friend">
                        <div className="message-text">{x?.content}</div>
                        <div className="message-info">
                            <span className='friend_name'>{x?.sender}</span>
                            <span>12:45 PM</span>
                        </div>
                    </div>
            ) : ''}
        </div >
        <div className='sendMessageBox'>
            <input onChange={(e) => setMessage(e.currentTarget.value)} placeholder='message....' className='chatMessageInput'></input>
            <div>
                <button id={receiverId} onClick={sendMessage} className='onMessageSend'> send</button>
            </div>
        </div>

    </>
    )
}