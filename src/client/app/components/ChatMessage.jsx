import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'

const style = {
  username: {
    color: 'green'
  },
  text: {
    wordBreak: 'break-word'
  }
}

class ChatMessage extends Component {
  render () {
    return (
      <div>
        {/*<Media.Left>*/}
          {/*<img width={64} height={64} src="public/images/goat.png" alt="Image"/>*/}
        {/*</Media.Left>*/}
        {/*<Media.Body>*/}
          <Media.Heading><h5 style={style.username}>{this.props.username}<small><i> liten text</i></small></h5></Media.Heading>
          <p style={style.text}>{this.props.text}</p>
        {/*</Media.Body>*/}
      </div>
    )
  }
}

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired
}

export default ChatMessage
