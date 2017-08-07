import React, { Component } from 'react'
import { render } from 'react-dom'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

class App extends Component {
  render () {
    return (
      <div>
        <MessageList></MessageList>
        <MessageInput></MessageInput>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
