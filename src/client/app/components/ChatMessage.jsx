import React, { Component } from 'react'

class ChatMessage extends Component {
  render () {
    return (
      <li>
        {this.props.text}
      </li>
    )
  }
}

export default ChatMessage
