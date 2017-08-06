import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import sha1 from 'sha1'

class ChatMessage extends Component {

  getColor (string) {
    return '#' + sha1(string).substr(0, 6)

  }

  getStyle () {
    return {
      username: {
        color: this.getColor(this.props.username)
      },
      text: {
        wordBreak: 'break-word'
      }
    }
  }

  render () {
    const style = this.getStyle()

    return (
      <div>
          <h6 style={style.username}>{this.props.username}<small><i> {moment(this.props.timestamp).calendar()}</i></small></h6>
          <p style={style.text}>{this.props.text}</p>
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
