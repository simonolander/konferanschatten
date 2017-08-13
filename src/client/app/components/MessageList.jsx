import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {

  render () {
    return (
      <div className='message-list'>
        {this.props.messages.map(text => <Message text={text} />)}
      </div>
    )
  }
}

export default MessageList
