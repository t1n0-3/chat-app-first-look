import './FriendsMenu.css'

import { useContext, useEffect, useState } from 'react'

import { GET, POST } from '../requester'
import { authContext } from '../context/authContext'

function FriendsMenu({ setChat, setRoomChat, setReceiverId, setChatMessages }) {

    const { auth, socket } = useContext(authContext)
    const [friends, setFriends] = useState([])

    const userId = auth._id ? auth._id : JSON.parse(auth)._id
    useEffect(() => {

        const payload = { userId }
        POST('users', payload).then(res => setFriends(res.friends))
    }, []);

    async function onChatPerson(e) {

        const dataMessage = {
            sender: userId,
            receiver: e.currentTarget.id,
        }
        const room = (dataMessage.sender + dataMessage.receiver).split('').sort().join('')
        dataMessage.room = room

        setReceiverId(dataMessage.receiver)
        setRoomChat(room)
        setChat(x => !x)
        setChatMessages([])
        // await POST('onChat', dataMessage)
    }
    return (
        <div className="right-chat">
            <ul className="friend-list">
                {friends && friends.map(x =>
                    <li key={x._id} id={x._id} onClick={onChatPerson}>
                        <img src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png" />
                        <span>{x.username}</span>
                    </li>)}
            </ul>
        </div>
    )
}

export default FriendsMenu