import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'

class ChatMessage extends Component {
  render () {
    return (
      <Media>
        {/*<Media.Left>*/}
          {/*<img width={64} height={64} src="public/images/goat.png" alt="Image"/>*/}
        {/*</Media.Left>*/}
        <Media.Body>
          <Media.Heading>{this.props.username}</Media.Heading>
          <p>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired
}

export default ChatMessage
