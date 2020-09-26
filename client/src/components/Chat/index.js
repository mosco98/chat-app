import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './style.css'
import InfoBar from '../InfoBar'
import Input from '../Input'
import Messages from '../Messages'
import TextContainer from '../TextContainer'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'localhost:5000'

  // for getting user name and room info
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {})

    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  }, [ENDPOINT, location.search])

  // for handling messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })

    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [messages, users])

  // function for sending messages
  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat
