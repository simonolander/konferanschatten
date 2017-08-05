import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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
          <h6 style={style.username}>{this.props.username}<small><i> {moment(this.props.timestamp).calendar()}</i></small></h6>
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
