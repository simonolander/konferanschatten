import React, { Component } from 'react'
import { render } from 'react-dom'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  postMessage (text) {
    this.setState({
      messages: this.state.messages.concat(text)
    })
  }

  render () {
    console.log(this.state.messages)
    return (
      <div>
        <MessageList/>
        <MessageInput
          onSubmit={this.postMessage.bind(this)}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
