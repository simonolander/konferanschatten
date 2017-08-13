import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'

class Message extends Component {

  render () {
    return (
      <Media className='message'>
        <Media.Body>
          <Media.Heading>{this.props.username}</Media.Heading>
          <p>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string
}

Message.defaultProps = {
  username: 'Anonym'
}

export default Message
