import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom'
import { io } from 'socket.io-client';

import { authContext } from './context/authContext';
import { POST } from './requester';

import Header from './Header/Header'; // Make sure the path to the Header component is correct
import Register from './Register/Register';
import Login from './Login/Login';
import useSessionStorage from './Hooks/sessionStorageHook';
import Footer from './Footer/Footer';
import ChatRoom from './ChatRoom/ChatRoom';

function App() {
  const [auth, setAuth] = useSessionStorage('userData', '')
  const navigate = useNavigate()
  const socket = io('http://localhost:3001', { transports: ['websocket'], upgrade: false });
  const [chatId, setChatId] = useState('')



  async function onLogin(e) {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const token = await POST('login', formData)
      setAuth(token)
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }

  }

  function onLogout() {
    setAuth('')
    navigate('/')
    sessionStorage.removeItem('userData')
  }

  const context = {
    auth,
    onLogin,
    onLogout,
    socket,
    setChatId,
    chatId,
  }

  return (
    <authContext.Provider value={context}>

      <Header />
      <Routes>

        {!auth ? <>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/create'></Route>
          <Route path='/login' element={<Login />} ></Route>
        </> : <>
          <Route path='/' element={<ChatRoom />}> </Route>
          <Route path='/logout'></Route>
          <Route path='/catalog'></Route>
          <Route path='/details'></Route>
        </>}

      </Routes>
      <Footer />
    </authContext.Provider>
  )
}

export default App;
