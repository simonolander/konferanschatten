import React, { Component } from 'react'

class MessageList extends Component {

  render () {
    return (
      <ul>
        {this.props.messages.map(text => <li>{text}</li>)}
      </ul>
    )
  }
}

export default MessageList
