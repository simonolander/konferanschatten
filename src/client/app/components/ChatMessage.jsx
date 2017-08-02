import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatMessage extends Component {
  render () {
    return (
      <li>
        {this.props.text}
      </li>
    )
  }
}

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired
}

export default ChatMessage
