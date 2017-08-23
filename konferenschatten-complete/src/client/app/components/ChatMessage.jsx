import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import sha1 from 'sha1'
import { Image, Media } from 'react-bootstrap'

class ChatMessage extends Component {

  getStyle () {
    return {
      username: {
        color: '#' + sha1(this.props.username).substr(0, 6),
        marginTop: '0px'
      },
      text: {
        wordBreak: 'break-word'
      }
    }
  }

  render () {
    const style = this.getStyle()

    return (
      <Media>
        <Media.Left><Image width={48} height={48} src={this.props.imageUrl} circle/></Media.Left>
        <Media.Body>
          <h6 style={style.username}>{this.props.username}<small><i> {moment(this.props.timestamp).calendar()}</i></small></h6>
          <p style={style.text}>{this.props.text}</p>
        </Media.Body>
      </Media>
    )
  }
}

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  imageUrl: PropTypes.string
}

ChatMessage.defaultProps = {
  imageUrl: 'public/images/goat.png',
  username: 'Anonymous'
}

export default ChatMessage
