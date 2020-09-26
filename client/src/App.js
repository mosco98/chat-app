import React from 'react'
import { Route } from 'react-router-dom'
import { Join, Chat } from './components'

const App = () => {
  return (
    <>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </>
  )
}

export default App
