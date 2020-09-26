import React from 'react'
import './style.css'

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form>
      <input
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        autoFocus={true}
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        SEND
      </button>
    </form>
  )
}

export default Input
