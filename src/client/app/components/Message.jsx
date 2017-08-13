import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Media } from 'react-bootstrap'

class Message extends Component {

  render () {
    return (
      <Media className='message'>
        <Media.Left>
          <Image
            width={56}
            height={56}
            src={this.props.imageUrl}
            circle
          />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{this.props.username} <small>{this.props.timestamp}</small></Media.Heading>
          <p>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string,
  imageUrl: PropTypes.string,
  timestamp: PropTypes.number
}

Message.defaultProps = {
  username: 'Anonym',
  imageUrl: 'public/images/goat.png',
  timestamp: 0
}

export default Message
