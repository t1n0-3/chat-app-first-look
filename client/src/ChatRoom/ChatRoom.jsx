import React, { useContext, useEffect, useState } from 'react';

import { authContext } from '../context/authContext';

import FriendsMenu from '../FriendsMenu/FriendsMenu';
import Chat from '../Chat/Chat';
export default function ChatRoom() {

    const [receiverId, setReceiverId] = useState('')
    const [roomChat, setRoomChat] = useState('')
    const [chatMessages, setChatMessages] = useState([])
    const [cachedMessages, setCachedMessages] = useState([])
    const [chat, setChat] = useState(false)
    const { socket } = useContext(authContext)
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        socket.on('receive_message', data => {
            setChatMessages(prev => [...prev, data])
            console.log(data)
        })
    }, [])

    useEffect(() => {
        if (cachedMessages && chatMessages) {
            setAllMessages([...cachedMessages, ...chatMessages])
        } else { console.log('няма чат'); }

    }, [cachedMessages, chatMessages])

    useEffect(() => {
        chat ? socket.emit('onJoinRoom', roomChat) : console.log('not in a room')
        socket.on('recieve_cache', async data => {
            if (data === null) {
                console.log('cached data is qual to NULL')
                return
            }
            setCachedMessages(data)
        })
    }, [chat, roomChat])

    return (
        <>{chat ? <Chat receiverId={receiverId} dbChat setCurrentMessages={setChatMessages} cachedData={allMessages} /> : null}
            <FriendsMenu setChatMessages={setChatMessages} setReceiverId={setReceiverId} setRoomChat={setRoomChat} setChat={setChat} />
        </>
    );
}
