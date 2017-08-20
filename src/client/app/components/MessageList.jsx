import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

class MessageList extends Component {

  render () {
    return (
      <div className='message-list'>
        {this.props.messages.map(message => <Message key={message.id} {...message} />)}
      </div>
    )
  }
}

MessageList.propTypes = {
  messages: PropTypes.array
}

MessageList.defaultProps = {
  messages: []
}

export default MessageList
