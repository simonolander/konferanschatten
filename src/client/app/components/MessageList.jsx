import React, { Component } from 'react'

class MessageList extends Component {

  render () {
    return (
      <div className='message-list'>
        {this.props.messages.map(text => <li>{text}</li>)}
      </div>
    )
  }
}

export default MessageList
