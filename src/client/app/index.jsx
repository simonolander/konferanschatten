import React, { Component } from 'react'
import { render } from 'react-dom'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

class App extends Component {

  postMessage (text) {
    console.log(`Meddelande från MessageInput: ${text}`)
  }

  render () {
    return (
      <div>
        <MessageList />
        <MessageInput
          onSubmit={this.postMessage.bind(this)}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
