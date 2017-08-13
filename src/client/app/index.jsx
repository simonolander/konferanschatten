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
    const message = {
      text: text,
      username: 'Simon',
      timestamp: + new Date()
    }

    this.setState({
      messages: this.state.messages.concat(message)
    })
  }

  render () {
    return (
      <div className='app row'>
        <div className='col-xs-6 col-xs-offset-3'>
          <MessageList
            messages={this.state.messages}
          />
          <MessageInput
            onSubmit={this.postMessage.bind(this)}
          />
        </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
